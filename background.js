chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url &&
    tab.url.includes('instagram.com/') &&
    !tab.url.includes('instagram.com/explore/') &&
    !tab.url.includes('instagram.com/reels/videos/') &&
    !tab.url.includes('instagram.com/direct/inbox/') &&
    !tab.url.includes('instagram.com/accounts/') &&
    !tab.url.includes('instagram.com/emails/') &&
    !tab.url.includes('instagram.com/push/') &&
    !tab.url.includes('instagram.com/ads/') &&
    !tab.url.includes('instagram.com/session/') &&
    !tab.url.includes('instagram.com/settings/') &&
    !tab.url.includes('instagram.com/your_activity/')
  ) {
    const username = tab.url.split('/')[3];
    if (changeInfo.status === 'complete') {
      let newobj = { msg: 'Start Scraping', username };
      chrome.tabs.sendMessage(tabId, newobj);
    }
  }
});
