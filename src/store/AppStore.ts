import { observable, action, runInAction, reaction } from 'mobx';
import { TLoginForm, TCard, TRegistrationForm, TRoute } from './Types';
import * as api from '../api';

class AppStore {
  @observable isLoggedIn: boolean = false;
  @observable token: string = '';
  @observable card: TCard | null = null;
  @observable addresses: string[] = [];
  @observable coordinates: number[] = [];

  constructor() {
    reaction(
      () => this.token,
      (token) => {
        this.getCard(token);
        this.getAddresses();
      }
    );
  }

  @action
  login = (form: TLoginForm): void => {
    api.login(form)
      .then(data => {
        if (data.success) {
          runInAction(() => {
            this.isLoggedIn = true;
            this.token = data.token;
          })
        }
      })
  }

  @action
  logout = () => {
    this.isLoggedIn = false;
    this.token = '';
  }

  @action
  registration = (form: TRegistrationForm) => {
    api.register(form).then(data => {
      if (data.success) {
        runInAction(() => {
          this.isLoggedIn = true;
          this.token = data.token;
        })
      }
    })
  }

  @action
  getCard = (token: string) => {
    api.getCard(token)
      .then(data => {
        runInAction(() => {
          this.card = data;
        });
      })
      .catch(e => {
        console.log(e);
      })
  }

  @action
  addCard = (form: TCard): void => {
    api.addCard(form)
      .then(data => {
        if (data.success) {
          
        }
      })
  }

  @action
  getAddresses = (): void => {
    api.getAddresses().then(data => {
      runInAction(() => {
        this.addresses = data.addresses;
      })
    })
  }

  @action
  getCoordinates = (route: TRoute): void => {
    api.getRoute(route.from, route.to)
      .then(data => {
        runInAction(() => {
          this.coordinates = data;
        })
      })
  }

  @action
  resetCoordinates = (): void => {
    this.coordinates = [];
  }
}

export default AppStore;
