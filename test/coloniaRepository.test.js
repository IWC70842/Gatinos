const axios = require('axios');
jest.mock('axios');

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();

axios.create.mockReturnValue({
  get: mockGet,
  post: mockPost,
  put: mockPut,
  delete: mockDelete
});

const coloniaRepository = require('../repositories/coloniaRepository');
const mockColonia = require('../data/colonia.json');
const mockColoniaNueva = require('../data/colonia_nueva.json');
const mockColonias = require('../data/colonias.json');

describe('ColoniaRepository CRUD happypath', () => {
  afterEach(()=>{
    jest.clearAllMocks();
  });
  test('Recuperar colonia por id', async () => {
    //Arrange
    mockGet.mockResolvedValue({ data: mockColonia });
    //Act
    const resultado = await coloniaRepository.recuperarPorId(1);
    //Assert
    expect(resultado).toEqual(mockColonia);
    expect(mockGet).toHaveBeenCalledWith('/colonias/1')
  })

  test('Recuperar todas las colonias', async ()=>{
     //Arrange
     mockGet.mockResolvedValue({ data: mockColonias });
     //Act
     const resultado = await coloniaRepository.listarColonias();
     //Assert
     expect(resultado).toEqual(mockColonias);
     expect(mockGet).toHaveBeenCalledWith('/colonias')

  })

  test('Crear una colonia', async ()=>{
     //Arrange
     mockPost.mockResolvedValue({data:1});
     //Act
     const resultado = await coloniaRepository.crearColonia(mockColoniaNueva);
     //Assert
     expect(resultado).toEqual(1);
     expect(mockPost).toHaveBeenCalledWith('/colonias', mockColoniaNueva);

  })

  test('Actualizar una colonia', async ()=>{
     //Arrange
     mockPut.mockResolvedValue({data:1});
     //Act
     const resultado = await coloniaRepository.actualizarColonia(mockColonia);
     //Assert
     expect(resultado).toEqual(1);
     expect(mockPut).toHaveBeenCalledWith(`/colonias/${mockColonia.id}`, mockColonia);

  })
});

describe('ColoniaRepository datos incorrectos',()=>{
  test('Actualizar una colonia', async ()=>{
    await expect(coloniaRepository.actualizarColonia({nombre: 'sin id'}))
    .rejects.toThrow('Id requerido');
 })
  test('Actualizar una colonia - Sin datos', async ()=>{
    await expect(coloniaRepository.actualizarColonia())
    .rejects.toThrow('Colonia requerida');
 })  
});
