chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "fetchEmails" && request.data) {
      const dataWithEmails = await Promise.all(request.data.map(async (entry) => {
        if (entry.website) {
          try {
            const response = await fetch(entry.website);
            const html = await response.text();
            const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            entry.email = emailMatch ? emailMatch[0] : "Not found";
          } catch (error) {
            entry.email = "Error fetching";
          }
        } else {
          entry.email = "No website";
        }
        return entry;
      }));
  
      chrome.runtime.sendMessage({ action: "saveCSV", data: dataWithEmails });
    } else if (request.action === "saveCSV") {
      const rows = request.data.map(row => `${row.name},${row.address},${row.phone},${row.website},${row.email}`);
      const csvContent = "data:text/csv;charset=utf-8,Name,Address,Phone,Website,Email\n" + rows.join("\n");
  
      const downloadLink = document.createElement("a");
      downloadLink.href = encodeURI(csvContent);
      downloadLink.download = "maps_data.csv";
      downloadLink.click();
    }
  });
  