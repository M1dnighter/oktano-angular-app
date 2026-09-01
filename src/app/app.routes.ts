import { Routes } from '@angular/router';
import { ResultPage } from './pages/catalog/result-page/result-page';
import { CategoryMenu } from './pages/category/category-menu/category-menu';
import { ProductPage } from './pages/product/product-page/product-page';
import { ProfilePage } from './pages/profile/profile-page/profile-page';
import { Login } from './pages/login/login/login';


export const routes: Routes = [
    {path: '', component: ResultPage},
    {path: 'category/:id', component: CategoryMenu},
    {path: 'product/:id', component: ProductPage},
    {path: 'profile', component: ProfilePage},
    {path: 'login', component: Login}
];
