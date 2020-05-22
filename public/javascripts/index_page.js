/**
 * update petBreed selection when petType is changed
 * @param ele petType option element
 */
function updateSubSelector(ele) {
    const petTypeName = ele.value;
    // petTypeName is null, clear second selection
    console.log(petTypeName);
    if (!petTypeName) {
        $('#petBreed').html('<option value="" selected>Any breed</option>');
    } else {
        const dataDiv = document.getElementById(petTypeName);
        $('#petBreed').html(dataDiv.innerHTML);
    }
}

$(function() {
    /**
     * submit search params, update animal list
     */
    $('#submit').click(function() {
        event.preventDefault();
        const json = formDataToJson($('#searchForm'));
        console.log(json);
        $.ajax({
            url: '/searchAnimals',
            data: JSON.stringify(json),
            type: 'POST',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $('#animalContent').html(data);
            },
            error: function(xhr, status, err) {
                alert(JSON.stringify(err));
                return err;
            },
        });
    });
});
