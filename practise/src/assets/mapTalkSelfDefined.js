

function infoClick(field,data) {
    var event = new CustomEvent('infoBoxEvent',{
        detail:{
            field:field,
            data:data
        }
    });
    document.dispatchEvent(event);
}