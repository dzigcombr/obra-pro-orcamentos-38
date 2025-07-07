
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, QrCode, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PixCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
  description: string;
}

const PixCheckout: React.FC<PixCheckoutProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  amount,
  description
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [payerEmail, setPayerEmail] = useState('');
  const [payerName, setPayerName] = useState('');
  const [pixData, setPixData] = useState<{
    qr_code: string | null;
    qr_code_base64: string | null;
    payment_id: string;
    message?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createPixPayment = async () => {
    if (!payerEmail || !payerName) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling create-pix-payment with:', { amount, description, payerEmail, payerName });

      const { data, error } = await supabase.functions.invoke('create-pix-payment', {
        body: {
          amount,
          description,
          payerEmail,
          payerName
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Erro na chamada da função');
      }

      if (data && data.success) {
        console.log('Payment created successfully:', data);
        setPixData({
          qr_code: data.qr_code,
          qr_code_base64: data.qr_code_base64,
          payment_id: data.payment_id,
          message: data.message
        });
        
        if (data.qr_code || data.qr_code_base64) {
          toast({
            title: "Pix Gerado!",
            description: "Use o QR Code ou copie o código para pagar.",
          });
        } else {
          toast({
            title: "Pagamento Criado",
            description: data.message || "Pagamento criado com sucesso.",
          });
        }
      } else {
        console.error('Payment creation failed:', data);
        const errorMessage = data?.error || 'Erro ao gerar pagamento Pix';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating Pix payment:', error);
      const errorMessage = `Não foi possível gerar o pagamento Pix: ${error.message}`;
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      toast({
        title: "Copiado!",
        description: "Código Pix copiado para a área de transferência.",
      });
    }
  };

  const handleClose = () => {
    setPixData(null);
    setPayerEmail('');
    setPayerName('');
    setError(null);
    onClose();
  };

  // Simulação de pagamento aprovado para teste
  const simulatePaymentSuccess = () => {
    toast({
      title: "Pagamento Aprovado!",
      description: "Seu pagamento foi confirmado. Gerando orçamento...",
    });
    onPaymentSuccess();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Pagamento via Pix - R$ {amount.toFixed(2)}
          </DialogTitle>
          <DialogDescription>
            Para gerar seu orçamento, é necessário o pagamento de uma taxa de R$ {amount.toFixed(2)}.
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!pixData ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payerName">Nome Completo</Label>
              <Input
                id="payerName"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                placeholder="Digite seu nome completo"
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payerEmail">E-mail</Label>
              <Input
                id="payerEmail"
                type="email"
                value={payerEmail}
                onChange={(e) => setPayerEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                disabled={loading}
              />
            </div>
            
            <Button 
              onClick={createPixPayment} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Gerando Pix..." : "Gerar Pagamento Pix"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {pixData.message && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{pixData.message}</AlertDescription>
              </Alert>
            )}
            
            <div className="text-center">
              <div className="mb-4">
                {pixData.qr_code_base64 ? (
                  <img 
                    src={pixData.qr_code_base64} 
                    alt="QR Code Pix" 
                    className="mx-auto border rounded-lg w-48 h-48"
                  />
                ) : (
                  <div className="mx-auto border rounded-lg w-48 h-48 flex items-center justify-center bg-gray-100">
                    <span className="text-gray-500 text-center px-4">
                      QR Code não disponível<br/>
                      Use o código Pix abaixo
                    </span>
                  </div>
                )}
              </div>
              
              {pixData.qr_code && (
                <div className="space-y-2">
                  <Label>Código Pix (Copiar e Colar)</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={pixData.qr_code} 
                      readOnly 
                      className="text-xs"
                    />
                    <Button 
                      onClick={copyPixCode}
                      variant="outline"
                      size="icon"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="text-sm text-muted-foreground text-center">
                Após realizar o pagamento, clique no botão abaixo para confirmar.
              </div>
              <Button 
                onClick={simulatePaymentSuccess}
                className="w-full"
                variant="outline"
              >
                Confirmar Pagamento (Teste)
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PixCheckout;
