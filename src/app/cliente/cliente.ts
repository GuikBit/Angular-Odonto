export class Cliente {
    
    id?: number;
    nSerie?: number;
    login?: string;
    senha?: string;
    email?: string;
    nome?: string;
    cpf?: string;
    dataCadastro?: string;
    dataNascimento?: string;
    telefone?: string; 
   

    //end
    cidade?: string ;
    bairro?: string ;
    logradouro?: string;
    numero?: string ;
    cep?: string ;
    complemento?: string ;
    referencia?: string ; 

    //pais
    nomeResp?: string;
    telResp?: string ;
    cpfResp?: string;
    

    //Anamnese
    porDoenca?: string;
    tratMedico?: string;
    nomeTrat?: string;
    usaMedic?: string;
    alergicoMedic?: string;
    sangramentoExcessivo?: boolean;
    hipertenso?: boolean;
    gravida?: boolean;
    traumatismoFace?: boolean;

    //outros

    queixaPrincipal?: string;

    dataUltimoExame?:string;

    frequenciaDentista?: string;

    higieneBucal?: string;

    frequenciaEscovacao?: string;

    habitos?: string;

    observacao?: string;


}