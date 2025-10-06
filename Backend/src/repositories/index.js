import repoFactory from "./repositories.service.js";
import RepositoryManager from "./repositories.manager.js";

/**
 * Archivo "barrel" - Re-exporta los componentes principales del sistema de repositorios
 *
 * Permite importar de forma flexible:
 * - import repoFactory from "./repositories" (default)
 * - import { repoFactory, RepositoryManager } from "./repositories" (named)
 */
export { repoFactory, RepositoryManager };
export default repoFactory;
