// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // UPDATE
  const devourBtns = document.querySelectorAll('.change-status');

  // Set up the event listener for the create button
  if (devourBtns) {
    devourBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        let devourStatus = e.target.getAttribute('data-devourIt');
        devourStatus = true;

        const devourItNow = {
          devoured: devourStatus,
        };
        console.log(devourItNow);

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(devourItNow),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed devoured to: ${devourStatus}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  };

  
});
