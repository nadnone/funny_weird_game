
function keyboardInputs_getter(player) {

    window.addEventListener('keydown', function(event) {
    
        let direction = {"x": 0, "y": 0};
        
    
        if (event.code === 'KeyA') {
            direction.x = -10;
        } else if (event.code === 'KeyD') {
            direction.x = 10;
        }

        player.walk(player.x + direction.x, player.y + direction.y, direction.x);

    });

}


export { keyboardInputs_getter };