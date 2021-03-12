// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }


  // Update status of burger status
  const devourBtns = document.querySelectorAll('.change-status');

  // Set up the event listener for the devour button
  if (devourBtns) {
    devourBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        let devourStatus = e.target.getAttribute('data-devourIt');
        devourStatus = true;

        const devourItNow = {
          devoured: devourStatus,
        };
        console.log(devourItNow);

        // send a put/update request to the server
        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(devourItNow),
        }).then((response) => {

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

  // Add a new burger
  const newBurgerBtn = document.getElementById('create-form');

  //Add event listener for submitting a new burger
  if (newBurgerBtn) {
    newBurgerBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      //getting the burger name from the form
      const newBurger = {
        burger_name: document.getElementById('bur').value.trim(),
        devoured: false,
      };

      // Send POST request to create a new burger
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('bur').value = '';

        console.log('Added a new burger to the devour wishlist!');
        location.reload();
      });
    });
  }

// delete a burger
const deleteBtns = document.querySelectorAll('.delete-burger');

// Set up the event listener for the delete button
if (deleteBtns) {
  deleteBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      
      fetch(`/api/burgers/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
};



});
