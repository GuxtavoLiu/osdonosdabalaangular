/**
 * @component agrupa as configurações gerais do sistema
 *
 * @classname Constantes
 * @author NextAge
 */
export abstract class Constants {

    static readonly deleteMessage = (str: string) => `Este registro pode estar ligado a registros de ${str}. Deseja realmente excluir?`;
    static readonly requiredFieldsError = `Preencha os campos obrigatórios!`;
    static readonly requiredFieldError = `Campo obrigatório`;
    static readonly invalidEmailError = `E-mail inválido`;
    static readonly invalidCNPJError = `CNPJ inválido`;
    static readonly invalidCPFError = `CPF inválido`;
    static readonly invalidDataError = `Data inválida`;
    static readonly listError = `Error ao listar os registros!`;
    static readonly listComboError = `Error ao listar os registros para o combo!`;

    static readonly ROLE_ADMIN = "ROLE_ADMIN";
    static readonly ROLE_USER = "ROLE_USER";
    static readonly ROLE_MODERATOR = "ROLE_MODERATOR";


}
