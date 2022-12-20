chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const newUserLoaded = async (username) => {
    try {
      const fetchedData = await fetch(
        `https://www.instagram.com/${username}/?__a=1&__d=1`
      );

      // Data extraction
      const data = await fetchedData.json();
      user = data.graphql.user;
      let followers = user.edge_followed_by.count;
      let following = user.edge_follow.count;
      let fullname = user.full_name;
      let user_name = user.username;
      let profile_pic = user.profile_pic_url_hd;

      //Sidebar creation, configuration and styling
      const sidebar = document.createElement('div');
      sidebar.classList.add('main-sidebar-scraping');
      sidebar.style.marginLeft = '20px';
      sidebar.style.padding = '10px';
      sidebar.style.background = '#a28089';
      sidebar.style.borderRadius = '25px';
      sidebar.style.display = 'none';
      let text = document.createTextNode(
        `${user_name} has ${followers} followers and follows ${following} profiles. The full name is ${fullname}. The profile picture can be seen following the link: ${profile_pic}`
      );
      sidebar.appendChild(text);
      let main = document.getElementsByClassName(
        ' x1cy8zhl x9f619 x78zum5 xdt5ytf x1dr59a3 x1y1aw1k xn6708d xx6bls6 x1ye3gou xvbhtw8 x1xgvd2v x1o5hw5a xaeubzz'
      )[0];
      while (main === undefined) {
        main = document.getElementsByClassName(
          ' x1cy8zhl x9f619 x78zum5 xdt5ytf x1dr59a3 x1y1aw1k xn6708d xx6bls6 x1ye3gou xvbhtw8 x1xgvd2v x1o5hw5a xaeubzz'
        )[0];
      }
      main.prepend(sidebar);

      //Hide and show button configuration and styling
      const hideShowButton = document.createElement('btn');
      hideShowButton.innerHTML = 'Hide/Show scrapped information';
      hideShowButton.style.fontSize = 11 + 'px';
      hideShowButton.style.appearance = 'none';
      hideShowButton.style.backgroundColor = '#000000';
      hideShowButton.style.border = '2px solid  #1A1A1A';
      hideShowButton.style.borderRadius = '15px';
      hideShowButton.style.boxSizing = 'border-box';
      hideShowButton.style.color = '#FFFFFF';
      hideShowButton.style.cursor = 'pointer';
      hideShowButton.style.display = 'inline-block';
      hideShowButton.style.fontFamily =
        'Roobert, -apple - system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans - serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';
      hideShowButton.style.fontWeight = 600;
      hideShowButton.style.lineHeight = 'normal';
      hideShowButton.style.margin = 600;
      hideShowButton.style.lineHeight = 'normal';
      hideShowButton.style.margin = 0;
      hideShowButton.style.outline = 'none';
      hideShowButton.style.padding = '16px 24px';
      hideShowButton.style.transition =
        'all 300ms cubic-bezier(.23, 1, 0.32, 1);';
      hideShowButton.onclick = () => {
        if (sidebar.style.display === 'none') {
          sidebar.style.display = '';
        } else {
          sidebar.style.display = 'none';
        }
      };
      main.prepend(hideShowButton);
    } catch (error) {
      console.log('USER NOT FOUND', error);
    }
  };

  const { username, msg } = request;
  if (msg === 'Start Scraping') {
    newUserLoaded(username);
  }

  //sendResponse();
});
