import 'normalize.css';
import '../styles/style.css';

import Controller from './controller';
import Model from './model/model';
import View from './view';

let model = new Model();
let view = new View();
let controller = new Controller(model, view);