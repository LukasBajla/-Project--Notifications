const App = {
  $: {
    notificationItem: document.querySelectorAll(".cont"),
    btnMAAR: document.querySelector("#btn-MarkAllAsRead"),
    notifName: document.querySelectorAll("a"),
  },
  init() {
    // Click on notification to turn it 'unread'
    App.$.notifName.forEach((element) => {
      element.addEventListener("click", (event) => {
        let notifNameRootContainer = element.closest(".cont")
        notifNameRootContainer.classList.toggle("unread");
        let unreadDot = notifNameRootContainer.querySelector("#icon-unread");
        unreadDot.classList.toggle("hidden");

        let unreadMsgs = document.querySelectorAll(".cont.unread");
        // console.log(unreadMsgs.length)
        App.notificationCount(unreadMsgs.length);

        // Mark All As Read button lights up when you have unread messages
        if (!App.$.btnMAAR.classList.contains("btn-MAAR-unread"))
          App.$.btnMAAR.classList.add("btn-MAAR-unread");
        else if (unreadMsgs.length == 0) {
          App.$.btnMAAR.classList.remove("btn-MAAR-unread");
        }
      });
    });

    // Mark All As Read button
    App.$.btnMAAR.addEventListener("click", (event) => {
      if (App.$.btnMAAR.classList.contains("btn-MAAR-unread")) {
        App.$.notifName.forEach((element) => {
          let notifNameRootContainer = element.closest(".cont")
          notifNameRootContainer.classList.remove("unread");
          let unreadDot = notifNameRootContainer.querySelector("#icon-unread");
          unreadDot.classList.add("hidden");
          App.$.btnMAAR.classList.remove("btn-MAAR-unread");
          if (document.getElementById("notif-count") != null) {
            document.getElementById("notif-count").remove();
          }
        });
      } else console.log("No unread messages!");
    });
  },
  notificationCount(notifCount) {
    console.log("Notif Count is : " + notifCount);
    let counterElem = document.createElement("p");
    let counterContainer = document.querySelector(".cont-title-notif");
    counterElem.setAttribute("id",'notif-count')

    // Remove counter if notifCount is 0
    if (notifCount == 0 && document.getElementById("notif-count") != null) {
      document.getElementById("notif-count").remove();
      console.log("Counter element removed");
    }

    //Create counter if none exists
    if (document.getElementById("notif-count") == null && notifCount >= 1) {
      counterContainer.appendChild(counterElem);
      console.log("Appending Child");
    }

    //Change number of notifications
    if (document.getElementById("notif-count") != null ) {
      document.getElementById("notif-count").textContent = notifCount;
      console.log("Inner HTML : ");
    }
  },
};

window.addEventListener("load", App.init);
