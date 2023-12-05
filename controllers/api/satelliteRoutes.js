const router = require('express').Router();
const { Satellite, Country } = require('../../models');

router.get('/', (req, res) => {
  res.render('sat', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;  

    const satellite = Satellite.findByPk(id, {
        include: [
            {
                model: Country,
                attributes: [
                    'id',
                    'country_name',
                ],
            },
        ],
    });

    const oneSatellite = satellite.get({ plain: true });

    res.render('satId', {
        oneSatellite,
        loggedIn: req.session.loggedIn,
    })
})

module.exports = router;
