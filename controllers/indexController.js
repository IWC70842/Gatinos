/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Renderización de la vista Index
 */

// Función que maneja la renderización de la vista 'index' para el dashboard
exports.dashboard = (req,res)=>{
  res.render('index',{
    title: 'Gestión de Colonias Felinas',
    sections: [
      {name: 'Gestión de Colonias', path: '/colonias'},
      {name: 'Listado de Gatos', path: '/gatos'}
    ]
  });
};