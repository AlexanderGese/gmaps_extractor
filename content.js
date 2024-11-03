chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "downloadCSV") {
      let data = [];
  
      document.querySelectorAll('.Nv2PK').forEach((result) => {
        let name = result.querySelector('.qBF1Pd')?.textContent || "";
        let address = result.querySelector('.rllt__details.lqhpac > div')?.textContent || "";
        let phone = result.querySelector('.kno-fv')?.textContent || "";
        let website = result.querySelector('.w0mwe')?.href || "";
  
        data.push({ name, address, phone, website });
      });
  
      chrome.runtime.sendMessage({ action: "fetchEmails", data: data });
    }
  });
  