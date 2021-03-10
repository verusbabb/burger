// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // UPDATE
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

  // CREATE
  const newBurgerBtn = document.getElementById('create-form');

  if (newBurgerBtn) {
    newBurgerBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        burger_name: document.getElementById('bur').value.trim(),
        devoured: false,
      };

      // Send POST request to create a new quote
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('bur').value = '';

        // Reload the page so the user can see the new quote
        console.log('Added a new burger to the devour wishlist!');
        location.reload();
      });
    });
  }

  
});
