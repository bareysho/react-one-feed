import { history } from './history';
import { ROUTES_PATHS } from 'constants/routesPaths';

export class NavigationService {
  static redirectTo = url => history.push(`${url}`);

  static replaceRoute = url => history.replace(`${url}`);

  static navigateToIndex = () => {
    this.redirectTo(`${ROUTES_PATHS.index}`)
  }

  static navigateToHome = () => {
    this.redirectTo(`${ROUTES_PATHS.index}${ROUTES_PATHS.home}`)
  }

  static navigateToAdmin = () => {
    this.redirectTo(`${ROUTES_PATHS.index}${ROUTES_PATHS.admin}`)
  }
}
