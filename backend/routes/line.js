const express = require('express');
const router = express.Router();

// LINE Rich Menu Configuration
router.get('/rich-menu', (req, res) => {
  try {
    const richMenu = {
      size: {
        width: 2500,
        height: 1686
      },
      selected: true,
      name: "BBingV 互惠接案系統",
      areas: [
        {
          bounds: {
            x: 0,
            y: 0,
            width: 625,
            height: 843
          },
          action: {
            type: "postback",
            label: "帳號登記",
            data: "action=register"
          }
        },
        {
          bounds: {
            x: 625,
            y: 0,
            width: 625,
            height: 843
          },
          action: {
            type: "postback",
            label: "報名案件",
            data: "action=browse_cases"
          }
        },
        {
          bounds: {
            x: 1250,
            y: 0,
            width: 625,
            height: 843
          },
          action: {
            type: "postback",
            label: "篇數統計",
            data: "action=view_stats"
          }
        },
        {
          bounds: {
            x: 1875,
            y: 0,
            width: 625,
            height: 843
          },
          action: {
            type: "postback",
            label: "合約簽署",
            data: "action=sign_contract"
          }
        },
        {
          bounds: {
            x: 0,
            y: 843,
            width: 625,
            height: 843
          },
          action: {
            type: "uri",
            label: "我的檔案",
            uri: "https://your-domain.com/profile"
          }
        },
        {
          bounds: {
            x: 625,
            y: 843,
            width: 625,
            height: 843
          },
          action: {
            type: "uri",
            label: "聯絡我們",
            uri: "https://your-domain.com/contact"
          }
        },
        {
          bounds: {
            x: 1250,
            y: 843,
            width: 625,
            height: 843
          },
          action: {
            type: "uri",
            label: "常見問題",
            uri: "https://your-domain.com/faq"
          }
        },
        {
          bounds: {
            x: 1875,
            y: 843,
            width: 625,
            height: 843
          },
          action: {
            type: "uri",
            label: "登出",
            uri: "https://your-domain.com/logout"
          }
        }
      ]
    };

    res.json({
      success: true,
      richMenu
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LINE Webhook (for receiving messages)
router.post('/webhook', (req, res) => {
  try {
    const events = req.body.events;

    events.forEach(event => {
      if (event.type === 'postback') {
        console.log('Postback received:', event.postback.data);
        // Handle postback actions
      } else if (event.type === 'message') {
        console.log('Message received:', event.message.text);
        // Handle messages
      }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
