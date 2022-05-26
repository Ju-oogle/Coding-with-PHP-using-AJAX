$(document).ready(function () {
    // Global Settings
    let edit = false;

    // Testing Jquery
    console.log("jquery is working!");
    fetchTasks();
    $("#task-result").hide(); // elemento oculto hasta que se haga una busqueda

    // search key type event
    $("#search").keyup(function () {
        if ($("#search").val()) { //si hay algun valor buscado
            let search = $("#search").val();
            $.ajax({
                url: "task-search.php", // a donde voy a hacer la petición
                data: { search }, // el valor de search es el que quiere obtener
                type: "POST", //tipo de peticion, envía algo al servidor (POST)
                success: function (response) { // sin funciona, si nos envia el dato.envia el valor del input a mi servidor
                    if (!response.error) {
                        let tasks = JSON.parse(response); /**convierte el string en OBJ con json, permitiendome recorrer el array */
                        let template = "";
                        tasks.forEach((task) => {
                            template += `
                    <li><a href="#" class="task-item">${task.name}</a></li>
                    `;
                        });
                        $("#task-result").show();
                        $("#container").html(template); //que el campo oculto se muestre con un resultado
                    }
                },
            });
        }
    });

    $("#task-form").submit((e) => {  //selecciona el elemento linea 37 index, captura el evento submit
        e.preventDefault();
        const postData = {
            name: $("#name").val(),
            description: $("#description").val(),
            id: $("#taskId").val(),
        }; // aca podriamos volver a utilizar una fx ajax como la de la linea 14, o bien esta opc simplificada
        const url = edit === false ? "task-add.php" : "task-edit.php";
        console.log(postData, url);
        $.post(url, postData, (response) => { //metodo post, url a donde enviare la info, qué info envío (mi obj),]
            console.log(response);
            $("#task-form").trigger("reset");
            fetchTasks(); //muestra la tabla actualizada sin tener que refrescar todo
        });
    });

    // Fetching Tasks
    function fetchTasks() {
        $.ajax({
            url: "tasks-list.php",
            type: "GET",
            success: function (response) {
                const tasks = JSON.parse(response);
                let template = "";
                tasks.forEach((task) => {
                    template += `
                    <tr taskId="${task.id}"> 
                    <td>${task.id}</td>
                    <td>
                    <a href="#" class="task-item">
                      ${task.name} 
                    </a>
                    </td>
                    <td>${task.description}</td>
                    <td>
                      <button class="task-delete btn btn-danger">
                       Delete 
                      </button>
                    </td>
                    </tr>
                  `;
                });
                $("#tasks").html(template);
            },
        });
    }

    // Get a Single Task by Id
    $(document).on("click", ".task-item", (e) => { // escucho el evento click en los elementos con clase llamada task-item
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr("taskId");
        $.post("task-single.php", { id }, (response) => {
            const task = JSON.parse(response);
            $("#name").val(task.name);
            $("#description").val(task.description);
            $("#taskId").val(task.id);
            edit = true;
        });
        e.preventDefault();
    });

    // Delete a Single Task
    $(document).on("click", ".task-delete", (e) => { // escucho el evento click en los elementos con clase llamada task-delete
        if (confirm("Are you sure you want to delete it?")) {
            const element = $(this)[0].activeElement.parentElement.parentElement; //this  es el elemento clickeado
            const id = $(element).attr("taskId"); //obtenemos la propiedad del boton clickeado linea 53 asignandola a la var id
            $.post("task-delete.php", { id }, (response) => { //eviamos la var id al archivo
                fetchTasks();
            });
        }
    });
});
