/**
 * validate user application
 * @param modal
 * @returns {{country: *, reason: *, candidate: string, town: *, street: *, postcode: *,
 *            animal: string, telephone: *, family: *, animalAlreadyHave: *}}
 */
function validateApplication(modal) {
    let animal =  validateAnimal(modal.find('#animal').val());
    let candidate = validateUser(modal.find('#candidate').val());
    let telephone =  validateTelephone(modal.find('#telephone'));
    let street =  validateStreet(modal.find('#street'));
    let town = validateTown(modal.find('#town'));
    let postcode = validatePostCode(modal.find('#postcode'));
    let country = validateCountry(modal.find('#country'));
    let family = validateFamily(modal.find('#family'));
    let ownAnimals = validateAnimalOwnership(modal.find('input[name=ownAnimals]'));
    let reason = validateReason(modal.find('#reason'));

    let results = { animal: animal, candidate: candidate, telephone: telephone, street: street,
                    town: town, postcode: postcode, country: country, family: family, animalAlreadyHave: ownAnimals,
                    reason: reason };


    console.log(results.length);
    //if (validateResultFields(results) === true ) {
        return results;
    //}
}

/*function validateResultFields(results) {

    let counter = 0;
    for (let key in results) {
        if (results.hasOwnProperty(key)) {
            if (results[key] === undefined) {
                return false;
            }
        }
        counter++;
    }
}*/

/**
 * show failure modal
 * @param message
 */
function failureModal(message) {
    let modalFailureMsg = $('#modal-sm-failure');
    modalFailureMsg.find("span.prompt_message").text(message);
    modalFailureMsg.modal();
}

/**
 * validate Animal ID
 * @param animal
 * @returns {string}
 */
function validateAnimal(animal) {

    if (animal === "") {
        failureModal("Error with Animal Data, please contact the administrator")
    } else {
        return animal;
    }
}

/**
 * validate User ID
 * @param user
 * @returns {string}
 */
function validateUser(user) {

    if (user === "") {
        failureModal("Error with User Data, please contact the administrator")
    } else {
        return user;
    }
}

/**
 * validate telephone number
 * @returns {*}
 * @param numberField
 */
function validateTelephone(numberField) {
    let telephone = numberField.val().trim();
    if ((telephone.length > 0) && (telephone.length <= 11)) {
        if (telephone.match(/^[0-9]+$/)) {
            numberField.css('background-color', 'white');
            return telephone;
        } else {
            numberField.css('background-color', '#ed969e');
        }
    }  else {
        numberField.css('background-color', '#ed969e');
    }
}

/**
 * validate street
 * @returns {*}
 * @param streetField
 */
function validateStreet(streetField) {
    let street = streetField.val().trim();
    if ((street.length > 0) && (street.length <= 40)) {
        if (street.match(/^[\w\s ,]+$/)) {
            streetField.css('background-color', 'white');
            return street;
        } else {
            streetField.css('background-color', '#ed969e');
        }
    }  else {
        streetField.css('background-color', '#ed969e');
    }
}

/**
 * validate town
 * @returns {*}
 * @param townField
 */
function validateTown(townField) {
    let town = townField.val().trim();
    if ((town.length > 0) && (town.length <= 20)) {
        if (town.match(/^[\w\s]+$/)) {
            townField.css('background-color', 'white');
            return town;
        } else {
            townField.css('background-color', '#ed969e');
        }
    }  else {
        townField.css('background-color', '#ed969e');
    }
}

/**
 * validate postcode
 * @returns {*}
 * @param postcodeField
 */
function validatePostCode(postcodeField) {
    let postcode = postcodeField.val().trim();
    if ((postcode.length > 0) && (postcode.length <= 10)) {
        if (postcode.match(/^[\w\s\d ]+$/)) {
            postcodeField.css('background-color', 'white');
            return postcode;
        } else {
            postcodeField.css('background-color', '#ed969e');
        }
    }  else {
        postcodeField.css('background-color', '#ed969e');
    }
}

/**
 * validate country
 * @returns {*}
 * @param countryField
 */
function validateCountry(countryField) {
    let country = countryField.val().trim();
    if ((country.length > 0) && (country.length <= 15)) {
        if (country.match(/^[\w\s ]+$/)) {
            countryField.css('background-color', 'white');
            return country;
        } else {
            countryField.css('background-color', '#ed969e');
        }
    }  else {
        countryField.css('background-color', '#ed969e');
    }
}

/**
 * validate family
 * @returns {*}
 * @param familyField
 */
function validateFamily(familyField) {
    let family = familyField.val().trim();
    if ((family.length > 0) && (family.length <= 50)) {
        if (family.match(/^[\w\s ,:;'".]+$/)) {
            familyField.css('background-color', 'white');
            return family;
        } else {
            familyField.css('background-color', '#ed969e');
        }
    }  else {
        familyField.css('background-color', '#ed969e');
    }
}

/**
 * validate ownsAnimals
 * @returns {*}
 * @param ownAnimalsField
 */
function validateAnimalOwnership(ownAnimalsField) {

    if(ownAnimalsField.filter(':checked').length === 0){
        ownAnimalsField.css('background-color', '#ed969e');
    } else {
        ownAnimalsField.css('background-color', 'white');
        return ownAnimalsField.val();
    }
}

/**
 * validate reason
 * @returns {*}
 * @param reasonField
 */
function validateReason(reasonField) {
    let reason = reasonField.val().trim();
    if ((reason.length > 0) && (reason.length <= 300)) {
        if (reason.match(/^[\w\s\d ,:;'".!?\\/]+$/)) {
            reasonField.css('background-color', 'white');
            return reason;
        } else {
            reasonField.css('background-color', '#ed969e');
        }
    }  else {
        reasonField.css('background-color', '#ed969e');
    }
}

$(document).ready(function () {
    $('#adopt button').click(function() {
        let modal = $('#modal-lg-applyForAdopt');
        modal.find("span.prompt_message").text("Please fill out the below form with current information..");
        modal.modal();
        $('#submitApp').click(function() {
            let modal = $(this).parent().parent().find('.modal-body');
            let formResult = validateApplication(modal);

            if (formResult !== undefined) {
                console.log("test");
            }
        });
    });
});

