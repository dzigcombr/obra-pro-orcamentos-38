
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Trash2, PlusCircle, CreditCard } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import PixCheckout from "@/components/PixCheckout";

interface Item {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

const CreateQuote = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([{ id: 1, description: '', quantity: 1, price: 0 }]);
  const [nextId, setNextId] = useState(2);
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState('');
  const [prazo, setPrazo] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [showPixCheckout, setShowPixCheckout] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { id: nextId, description: '', quantity: 1, price: 0 }]);
    setNextId(nextId + 1);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: keyof Omit<Item, 'id'>, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0);
  }, [items]);

  const handleGenerateQuote = () => {
    // Validar se todos os campos obrigatórios estão preenchidos
    if (!clientName || !category || items.some(item => !item.description)) {
      toast({
        title: "Campos Obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Mostrar checkout Pix
    setShowPixCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    generateFinalQuote();
  };

  const generateFinalQuote = () => {
    toast({
      title: "Orçamento Gerado com Sucesso!",
      description: "Seu orçamento foi criado e está pronto para ser enviado ao cliente.",
    });
    
    // Aqui seria a lógica para gerar o PDF e salvar no banco
    console.log('Generating quote with data:', {
      clientName,
      category,
      items,
      prazo,
      pagamento,
      total
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerateQuote();
  };

  return (
    <div className="space-y-6">
      {!paymentCompleted && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Taxa de Geração de Orçamento</p>
                <p className="text-sm text-yellow-700">
                  Para gerar seu orçamento profissional, é necessário o pagamento de R$ 2,99 via Pix.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Criar Novo Orçamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nome do Cliente</Label>
                <Input 
                  id="clientName" 
                  placeholder="Ex: João da Silva" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria do Serviço</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pedreiro">Pedreiro</SelectItem>
                    <SelectItem value="vidraceiro">Vidraceiro</SelectItem>
                    <SelectItem value="marceneiro">Marceneiro</SelectItem>
                    <SelectItem value="gesseiro">Gesseiro / Drywall</SelectItem>
                    <SelectItem value="encanador">Encanador</SelectItem>
                    <SelectItem value="eletricista">Eletricista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Itens do Orçamento (Materiais e Mão de Obra)</h3>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex flex-wrap items-end gap-4 p-4 border rounded-lg">
                    <div className="flex-grow min-w-[200px] space-y-2">
                      <Label htmlFor={`item-desc-${item.id}`}>Descrição</Label>
                      <Input 
                        id={`item-desc-${item.id}`} 
                        placeholder="Ex: Instalação de chuveiro" 
                        value={item.description} 
                        onChange={e => handleItemChange(item.id, 'description', e.target.value)} 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-qty-${item.id}`}>Qtd.</Label>
                      <Input 
                        id={`item-qty-${item.id}`} 
                        type="number" 
                        min="0" 
                        value={item.quantity} 
                        onChange={e => handleItemChange(item.id, 'quantity', Number(e.target.value))} 
                        className="w-20" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-price-${item.id}`}>Preço (R$)</Label>
                      <Input 
                        id={`item-price-${item.id}`} 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        value={item.price} 
                        onChange={e => handleItemChange(item.id, 'price', Number(e.target.value))} 
                        className="w-28" 
                        required
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveItem(item.id)} 
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-4" onClick={handleAddItem}>
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item
              </Button>
            </div>
            
            <Separator />
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prazo">Prazo Estimado</Label>
                <Input 
                  id="prazo" 
                  placeholder="Ex: 5 dias úteis" 
                  value={prazo}
                  onChange={(e) => setPrazo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pagamento">Forma de Pagamento</Label>
                <Input 
                  id="pagamento" 
                  placeholder="Ex: 50% de entrada, 50% na entrega" 
                  value={pagamento}
                  onChange={(e) => setPagamento(e.target.value)}
                />
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-muted-foreground">Total</p>
              <p className="text-3xl font-bold">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" size="lg" disabled={paymentCompleted}>
              {paymentCompleted ? "Orçamento Gerado!" : "Pagar e Gerar Orçamento"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <PixCheckout
        isOpen={showPixCheckout}
        onClose={() => setShowPixCheckout(false)}
        onPaymentSuccess={handlePaymentSuccess}
        amount={2.99}
        description={`Geração de orçamento - ${category} para ${clientName}`}
      />
    </div>
  );
};

export default CreateQuote;
