function getAnimals() {
    $.getJSON("http://localhost:5000/animals", function(data) {
        $("#animals-alert").hide();
        $("#animals").html("");
        data.forEach(function(animal) {
            if (animal.sound !== null) {
                var text = animal.name + " does " + animal.sound;
            } else {
                var text = animal.name + " is silent";
            }
            $("#animals").append("<li>" + text + "</li>");
        })
    });
}
