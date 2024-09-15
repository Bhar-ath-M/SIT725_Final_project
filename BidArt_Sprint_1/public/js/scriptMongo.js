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



function postBid(bid){
    $.ajax({
        url:'/api/bid',
        type:'POST',
        //data: bid,
        contentType: 'application/json',
        data: JSON.stringify(bid),
        success: (result)=>{
            console.log('Bid Post Result:', result);
            if (result.statusCode === 201) {
                alert('Bid successful');
                getAllBids();
            }
        },
        error: (xhr, status, error) => {
            console.error('Failed to submit bid:', error);
            alert('Failed to submit bid. Please try again.');
        }
    });
}

function getAllBids(){
    $.get('/api/bids', (response)=>{
        console.log('Get All Bids Response:', response);
        if (response.statusCode === 200) {
            addTables(response.data);
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