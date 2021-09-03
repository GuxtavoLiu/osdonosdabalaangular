import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExampleComponent} from "./example.component";


const routes: Routes = [
    {path: '', component: ExampleComponent},
];

/**
 * @routingModule responsavel por configurar as rotas da funcionalidade Exemplo,
 * se tiver apenas um componente o path será "",
 * senão é necessário configurar uma sub-rota, por exemplo "lista" para um componente de lista
 *
 * @classname ExampleRoutingModule
 * @author NextAge
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExampleRoutingModule {
}
