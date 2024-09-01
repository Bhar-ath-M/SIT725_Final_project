/*
const addTables = (items) => {
    $("#bidTableBody").empty();

    items.forEach(item => {
        let itemToAppend = `
            <tr>
                <td>${item.name}</td>
                <td>${item.bid}</td>
            </tr>
        `;
        $("bidTableBody").append(itemToAppend)
    });
}
*/


const addTables = (items) => {
    $("#emptybid").empty();
    items.forEach(item => {
        let itemToAppend = 
            '<p>'+item.name+' - '+item.bid+ '</p>'
        ;
        $("#emptybid").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.name = $('#name').val();
    formData.mobile = $('#mobile').val();
    formData.bid = $('#bid').val();

    console.log(formData);
    postBid(formData);
}

function postBid(bid) {
    $.ajax({
        url:'/api/bid',
        type:'POST',
        timeout: 5000,
        contentType: 'application/json', 
        data: JSON.stringify(bid),
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Bid successful');
                location.reload();
            }
        },
        error: (xhr, status, error) => {
            console.error('Error uploading the bid:', error);
        }
    });
}


function getAllBids() {
    $.ajax({
        url: '/api/bid',
        type: 'GET',
        timeout: 5000,
        success: (result) => {
            if (result.statusCode === 200) {
                console.log('Data:', result.data);
                addTables(result.data);
            }
        },
        error: (xhr, status, error) => {
            console.error('Error fetching bids:', error);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();

    getAllBids();

    $('#formSubmit').click(()=>{
        formSubmitted();
    });
});