import { ctx, WALK_SPEED } from "./constants.js";

function keyboardInputs_getter(player) {

    window.addEventListener('keydown', (event) => {
    
        let direction = {"x": 0, "y": 0};    
    
        if (event.code === 'KeyA') {
            player.velocity.x = -WALK_SPEED 
        }
        if (event.code === 'KeyD') {
            player.velocity.x = WALK_SPEED
        }
        
        if (event.code === 'Space' && !player.jumping) { 
            player.velocity.y = -player.height * 1.5;
            player.jumping = true;
        }

        if (event.code === 'Enter') {
            player.shooting = true;
        }


    });

    window.addEventListener('keyup', (event) => {

        if (event.code === 'KeyA') {
            player.animID = "idle_left";
            player.velocity.x = 0;
        }
        if (event.code === 'KeyD') {
            player.animID = "idle_right";
            player.velocity.x = 0;
        }

        if (event.code === 'Enter') {
            player.shooting = false;
        }

    });
}


export { keyboardInputs_getter };