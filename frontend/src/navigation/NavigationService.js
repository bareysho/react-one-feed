import { history } from './history';

export class NavigationService {
  static redirectTo = url => history.push(`${url}`);

  static replaceRoute = url => history.replace(`${url}`);
}