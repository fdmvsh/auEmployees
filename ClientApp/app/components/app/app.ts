import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([{
            route: ['', 'home'],
            name: 'Employees',
            settings: { icon: 'th-list' },
            moduleId: '../home/home',
            nav: true,
            title: 'Employees'
        }, {
                route: 'positions',
                name: 'Employees',
                settings: { icon: 'th-list' },
                moduleId: '../positions/positions',
                nav: true,
                title: 'Positions'
            }, {
                route: 'insert',
                name: 'Insert',
                settings: { icon: 'th-list' },
                moduleId: '../insert/insert',
                nav: false,
                title: 'Insert'
            }, {
                route: '/api/Employee/*_id',
                name: 'Detail',
                settings: { icon: 'th-list' },
                moduleId: '../detail/detail',
                nav: false,
                title: 'Detail'
            }, {
                route: '/api/Employee/*_id/edit',
                name: 'Edit',
                settings: { icon: 'th-list' },
                moduleId: '../edit/edit',
                nav: false,
                title: 'Edit'
            }]);

        this.router = router;
    }
}
