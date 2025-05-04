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

const gatoRepository = require('../repositories/gatoRepository');
const mockGato = require('../data/gato.json');
const mockGatoNuevo = require('../data/gato_nuevo.json');
const mockGatos = require('../data/gatos.json');

describe('GatoRepository CRUD happy path', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Recuperar gato por id', async () => {
    mockGet.mockResolvedValue({ data: mockGato });
    const resultado = await gatoRepository.recuperarGatoPorId(8);
    expect(resultado).toEqual(mockGato);
    expect(mockGet).toHaveBeenCalledWith('/gatos/8');
  });

  test('Listar todos los gatos', async () => {
    mockGet.mockResolvedValue({ data: mockGatos });
    const resultado = await gatoRepository.listarGatos();
    expect(resultado).toEqual(mockGatos);
    expect(mockGet).toHaveBeenCalledWith('/gatos');
  });

  test('Crear un gato', async () => {
    mockPost.mockResolvedValue({ data: 8 });
    const resultado = await gatoRepository.crearGato(mockGatoNuevo);
    expect(resultado).toEqual(8);
    expect(mockPost).toHaveBeenCalledWith('/gatos', mockGatoNuevo);
  });

  test('Actualizar un gato', async () => {
    mockPut.mockResolvedValue({ data: 1 });
    const resultado = await gatoRepository.actualizarGato(mockGato);
    expect(resultado).toEqual(1);
    expect(mockPut).toHaveBeenCalledWith(`/gatos/${mockGato.id}`, mockGato);
  });

  test('Eliminar un gato', async () => {
    mockDelete.mockResolvedValue({ data: 1 });
    const resultado = await gatoRepository.eliminarGato(8);
    expect(resultado).toEqual(1);
    expect(mockDelete).toHaveBeenCalledWith('/gatos/8');
  });
});

describe('GatoRepository datos incorrectos', () => {
  test('Recuperar gato sin ID', async () => {
    await expect(gatoRepository.recuperarGatoPorId())
      .rejects.toThrow('Id requerido');
  });

  test('Crear gato sin datos', async () => {
    await expect(gatoRepository.crearGato())
      .rejects.toThrow('gato requerido');
  });

  test('Actualizar gato sin datos', async () => {
    await expect(gatoRepository.actualizarGato())
      .rejects.toThrow('Gato requerido');
  });

  test('Actualizar gato sin ID', async () => {
    await expect(gatoRepository.actualizarGato({ nombre: 'sin id' }))
      .rejects.toThrow('Id requerido');
  });

  test('Eliminar gato sin ID', async () => {
    await expect(gatoRepository.eliminarGato())
      .rejects.toThrow('Id requerido');
  });
});