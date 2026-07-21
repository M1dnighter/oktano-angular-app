import { Routes } from '@angular/router';
import { ResultPage } from './pages/catalog/result-page/result-page';
import { CategoryMenu } from './pages/category/category-menu/category-menu';


export const routes: Routes = [
    {path: '', component: ResultPage},
    {path: 'category/:id', component: CategoryMenu}
];
