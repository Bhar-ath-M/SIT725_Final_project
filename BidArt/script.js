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
    items.reverse().forEach(item => {
        let itemToAppend = 
            '<h3><strong>'+item.name+'</strong> has bid AUD<strong> '+item.bid+'<strong></h3>'
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

let socket = io();

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
                socket.emit('bidsuccess')             
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