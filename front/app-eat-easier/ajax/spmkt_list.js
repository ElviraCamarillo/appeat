const API_URL = "http://localhost:8000/api/";

let user_profile_id = 0
let my_json_list = []
let user_planner_id = 0



const getUserSprmktList = async() => {

    try {
        const response = await fetch(`${API_URL}users/${user_profile_id}/planners/${user_planner_id}/menu/sprmkt_list/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json()
        console.log(data)

        return data

    } catch (error) {
        console.log(error)
    }

}

function periodRetrieve() {

    period_str = "Periodo " + my_json_list[0].user_planner.period
    document.querySelector(".period").innerText = period_str
}


function populate_nodes(n) {

    this_attr = my_json_list[n].id
    my_container.lastElementChild.setAttribute("id", this_attr) //no se toca 

    this_attr = my_json_list[n].qty
    this_attr += " " + my_json_list[n].stock_package.package_type.package_desc
    this_attr += " " + my_json_list[n].stock_package.spq_value
    this_attr += " " + my_json_list[n].stock_package.unit_type.equivalency
    this_attr += " " + my_json_list[n].stock_package.ingredient.ingredient_name
    this_attr += " " + my_json_list[n].stock_package.additional_desc

    console.log(this_attr)
    my_container.lastElementChild.querySelectorAll(".qty")[0].innerText = this_attr


}

function clone_html_item() {

    my_item = document.createElement("div")
    my_container.appendChild(my_item)

    my_container.lastElementChild.outerHTML = my_container.firstElementChild.outerHTML
    console.log(my_container.lastElementChild.outerHTML)
}


const transfer_retrieve = async() => {

    my_json_list = await getUserSprmktList();
    json_items_num = my_json_list.length

    periodRetrieve()

    if (json_items_num > 1) {

        for (i = 0; i < json_items_num; i++) {

            populate_nodes(i)

            if (i < json_items_num - 1) {
                clone_html_item()
            }
        }

    } else {
        populate_nodes(0)
    }

    console.log("transfer retrieve")

}


$(document).ready(() => {

    my_container = document.querySelector(".json_container")
    my_template_item = my_container.children[0]

    user_profile_id = 1
    user_planner_id = 1
    transfer_retrieve();

});