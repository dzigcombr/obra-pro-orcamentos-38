
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, description, payerEmail, payerName } = await req.json();
    
    const accessToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN');
    
    if (!accessToken) {
      console.error('MERCADO_PAGO_ACCESS_TOKEN not found in environment variables');
      throw new Error('Mercado Pago access token not configured');
    }

    console.log('Access token found:', accessToken ? 'Yes' : 'No');
    console.log('Creating payment for amount:', amount);

    // Generate UUID for idempotency key
    const idempotencyKey = crypto.randomUUID();

    const paymentData = {
      transaction_amount: Number(amount),
      description: description || 'Pagamento via Pix',
      payment_method_id: "pix",
      payer: {
        email: payerEmail,
        first_name: payerName,
        identification: {
          type: "CPF",
          number: "12345678901" // CPF fictício para teste
        }
      },
      notification_url: "https://webhook.site/unique-id" // URL fictícia para teste
    };

    console.log('Payment data:', JSON.stringify(paymentData, null, 2));

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Idempotency-Key': idempotencyKey,
        'User-Agent': 'Lovable/1.0'
      },
      body: JSON.stringify(paymentData)
    });

    const responseText = await response.text();
    console.log('Mercado Pago response status:', response.status);
    console.log('Mercado Pago response headers:', Object.fromEntries(response.headers.entries()));
    console.log('Mercado Pago response body:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (!response.ok) {
      console.error('Mercado Pago API error details:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      
      // Tratamento específico para diferentes tipos de erro
      if (response.status === 401) {
        throw new Error('Token de acesso inválido ou expirado');
      } else if (response.status === 400) {
        const errorMessage = data.message || 'Dados de pagamento inválidos';
        throw new Error(`Erro de validação: ${errorMessage}`);
      } else if (response.status === 403) {
        throw new Error('Acesso negado - verifique as permissões do token');
      } else {
        const errorMessage = data.message || data.error?.message || 'Erro desconhecido';
        throw new Error(`Erro da API Mercado Pago: ${errorMessage}`);
      }
    }

    console.log('Payment created successfully:', data.id);

    // Verificar se os dados do QR Code estão presentes
    if (!data.point_of_interaction?.transaction_data) {
      console.error('No transaction data in response. Full response:', data);
      
      // Se não tem QR code, mas o pagamento foi criado, retornar dados básicos
      const result = {
        success: true,
        payment_id: data.id,
        status: data.status,
        qr_code: null,
        qr_code_base64: null,
        message: 'Pagamento criado, mas QR Code não disponível'
      };
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = {
      success: true,
      payment_id: data.id,
      qr_code: data.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
      status: data.status,
      ticket_url: data.point_of_interaction.transaction_data.ticket_url || null
    };

    console.log('Returning successful result:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating Pix payment:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
