const express = require("express");
const fundingModel = require("./funding-model.js");
const router = express.Router();

router.get("/fundings", (req, res) => {
  fundingModel.findAllFunding().then(fundings => {
    if (!fundings[0]) {
      res.json("null");
    } else {
      res.json(fundings);
    }
  });
});

router.get("/fundings/:id", (req, res) => {
  fundingModel
    .findFundingById(req.params.id)
    .then(funding => {
      if (!funding) {
        res.status(401).json({ message: " Invalid Id", err });
      } else {
        res.status(200).json(funding);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to find the funding", err });
    });
});

router.post('/fundings', (req, res) => {
    fundingModel
      .addFunding(req.body)
      .then(funding=> {
        res.status(200).json(funding);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create the funding", err });
      });
})

router.put('/fundings/:id', (req, res) => {
    fundingModel.findFundingById(req.params.id).then(funding => {
        if (!funding) {
        res.status(401).json({ message: " Invalid Id", err });
      } else {
        fundingModel
          .updateFunding(req.params.id, req.body)
          .then(funding => {
            res.status(200).json({ message: "updated", funding });
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: "Failed to update the funding", err });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to find the funding", err });
    });
    
})

router.delete('/fundings/:id', (req, res) => {
    fundingModel
      .findFundingById(req.params.id)
      .then(funding => {
        if (!funding) {
          res.status(401).json({ message: " Invalid Id", err });
        } else {
         fundingModel
            .removeFunding(req.params.id)
            .then(result => {
              res.status(200).json(result);
            })
            .catch(err => {
              res
                .status(500)
                .json({ message: "Failed to remove the funding", err });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to find the funding", err });
      });
})
module.exports = router;
