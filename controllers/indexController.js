exports.dashboard = (req,res)=>{
  res.render('index',{
    title: 'Panel de control',
    sections: [
      {name: 'Colonias', path: '/colonias'},
      {name: 'Gatos', path: '/gatos'}
    ]
  });
};