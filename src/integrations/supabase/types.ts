export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      anuncios: {
        Row: {
          data_fim: string | null
          data_inicio: string | null
          id: string
          imovel_id: string | null
          plano_id: string | null
          status: string | null
          usuario_id: string | null
        }
        Insert: {
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          imovel_id?: string | null
          plano_id?: string | null
          status?: string | null
          usuario_id?: string | null
        }
        Update: {
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          imovel_id?: string | null
          plano_id?: string | null
          status?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anuncios_imovel_id_fkey"
            columns: ["imovel_id"]
            isOneToOne: false
            referencedRelation: "imoveis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anuncios_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anuncios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      catalogo_produtos_masterclass: {
        Row: {
          armazenamento_gb: number | null
          cat_teste: string[] | null
          categoria: string | null
          cores: string[] | null
          data_registro: string | null
          descricao: string | null
          garantia_meses: number | null
          id: number
          id_lojista: number | null
          imagem: string | null
          lacrado: boolean | null
          marca: string | null
          nome: string | null
          preco_avista: number | null
          preco_prazo: number | null
          qtd_estoque: number | null
          status: string | null
        }
        Insert: {
          armazenamento_gb?: number | null
          cat_teste?: string[] | null
          categoria?: string | null
          cores?: string[] | null
          data_registro?: string | null
          descricao?: string | null
          garantia_meses?: number | null
          id?: number
          id_lojista?: number | null
          imagem?: string | null
          lacrado?: boolean | null
          marca?: string | null
          nome?: string | null
          preco_avista?: number | null
          preco_prazo?: number | null
          qtd_estoque?: number | null
          status?: string | null
        }
        Update: {
          armazenamento_gb?: number | null
          cat_teste?: string[] | null
          categoria?: string | null
          cores?: string[] | null
          data_registro?: string | null
          descricao?: string | null
          garantia_meses?: number | null
          id?: number
          id_lojista?: number | null
          imagem?: string | null
          lacrado?: boolean | null
          marca?: string | null
          nome?: string | null
          preco_avista?: number | null
          preco_prazo?: number | null
          qtd_estoque?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalogo_produtos_id_lojista_fkey"
            columns: ["id_lojista"]
            isOneToOne: false
            referencedRelation: "lojistas_masterclass"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          id: string
          nome: string
        }
        Insert: {
          id?: string
          nome: string
        }
        Update: {
          id?: string
          nome?: string
        }
        Relationships: []
      }
      imoveis: {
        Row: {
          area: number | null
          categoria_id: string | null
          criado_em: string | null
          descricao: string | null
          garagem: boolean | null
          id: string
          imagens: string[] | null
          localizacao: string
          preco: number
          quartos: number | null
          titulo: string
          usuario_id: string | null
        }
        Insert: {
          area?: number | null
          categoria_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          garagem?: boolean | null
          id?: string
          imagens?: string[] | null
          localizacao: string
          preco: number
          quartos?: number | null
          titulo: string
          usuario_id?: string | null
        }
        Update: {
          area?: number | null
          categoria_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          garagem?: boolean | null
          id?: string
          imagens?: string[] | null
          localizacao?: string
          preco?: number
          quartos?: number | null
          titulo?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "imoveis_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imoveis_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      lojistas_masterclass: {
        Row: {
          criado_em: string
          id: number
          nome_loja: string | null
        }
        Insert: {
          criado_em?: string
          id?: number
          nome_loja?: string | null
        }
        Update: {
          criado_em?: string
          id?: number
          nome_loja?: string | null
        }
        Relationships: []
      }
      planos: {
        Row: {
          id: string
          limite_imagens: number | null
          limite_postagens: number | null
          nome: string
          preco: number
        }
        Insert: {
          id?: string
          limite_imagens?: number | null
          limite_postagens?: number | null
          nome: string
          preco: number
        }
        Update: {
          id?: string
          limite_imagens?: number | null
          limite_postagens?: number | null
          nome?: string
          preco?: number
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          id: string
          nome: string | null
          plano_id: string | null
          tipo: string
          whatsapp: string | null
        }
        Insert: {
          id: string
          nome?: string | null
          plano_id?: string | null
          tipo: string
          whatsapp?: string | null
        }
        Update: {
          id?: string
          nome?: string | null
          plano_id?: string | null
          tipo?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios_masterclass: {
        Row: {
          criado_em: string
          email: string | null
          id: number
          id_loja: number | null
          nome: string | null
          uid_usuario: string | null
        }
        Insert: {
          criado_em?: string
          email?: string | null
          id?: number
          id_loja?: number | null
          nome?: string | null
          uid_usuario?: string | null
        }
        Update: {
          criado_em?: string
          email?: string | null
          id?: number
          id_loja?: number | null
          nome?: string | null
          uid_usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_id_loja_fkey"
            columns: ["id_loja"]
            isOneToOne: false
            referencedRelation: "lojistas_masterclass"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      resumo_catalogo: {
        Row: {
          data_ultimo_cadastro: string | null
          media_estoque_por_produto: number | null
          perc_disponiveis: number | null
          perc_encomenda: number | null
          perc_esgotados: number | null
          preco_medio_produtos: number | null
          produto_mais_barato: number | null
          produto_mais_caro: number | null
          total_disponiveis: number | null
          total_encomenda: number | null
          total_esgotados: number | null
          total_lacrados: number | null
          total_produtos: number | null
          total_seminovos: number | null
          valor_total_estoque_disponivel: number | null
          valor_total_estoque_geral: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
