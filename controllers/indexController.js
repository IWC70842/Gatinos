exports.dashboard = (req,res)=>{
  res.render('index',{
    title: 'Gestión de Colonias Felinas',
    sections: [
      {name: 'Gestión de Colonias', path: '/colonias'},
      {name: 'Listado de Gatos', path: '/gatos'}
    ]
  });
};