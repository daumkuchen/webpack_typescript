import Schedule from '../../utility/Schedule';
import Utility from '../../utility/Utility';

export default class Startup {
    
    constructor() {
    }

    public run(prev, next, $newContent, params, controllerManager, nextTask) {

        let _ = this;
        let dl = null;

        return () => {
            
            const schedule = new Schedule();
            const PROCESS_TIME: number = 0;

            let content: any = document.querySelector('.page-content');
            let id: string = content.getAttribute('id');

            schedule.add(resolve => {
            
                controllerManager.add(id, content);
                Schedule.wait(PROCESS_TIME).then(resolve);

            });

            schedule.add(resolve => {

                controllerManager.use('current').viewWillLoad();

                setTimeout(() => {
                    controllerManager.use('current').viewDidLoad();
                }, 200);

                // sessionStorage
                // if(sessionStorage.getItem('load') != '0') {}

                Schedule.wait(PROCESS_TIME).then(resolve);

            });

            schedule.add(resolve => {

                controllerManager.use('current').viewWillAppear();

                setTimeout(() => {
                    controllerManager.use('current').viewDidAppear();
                }, 200);
                
                Schedule.wait(PROCESS_TIME).then(resolve);
                
            });

            schedule.done(function(){

                nextTask(dl)

                // sessionStorage
                // if(sessionStorage.getItem('load') === null || sessionStorage.getItem('load') != '0'){
                //     sessionStorage.setItem('load', '0');
                // }

            });

        }

    }

}