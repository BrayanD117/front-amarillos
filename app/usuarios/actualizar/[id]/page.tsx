'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface UsuarioFormData {
    primerApellido: string;
    segundoApellido?: string;
    primerNombre: string;
    segundoNombre?: string;
    idTipoDocumento: number;
    numeroDocumento: string;
    direccion: string;
    telefono: string;
    idGrupoSanguineo: number;
    rh: string;
    eps: string;
    arl: string;
    pension: string;
    licencia: string;
    idCategoriaLicencia: number;
    organismo: string;
    vigencia: string;
    usuario: string;
    idRol: number;
    idEstado: number;
}

interface Opcion {
    id: number;
    nombre: string;
}

interface Opciones {
    tiposDocumento: Opcion[];
    gruposSanguineos: Opcion[];
    categoriasLicencia: Opcion[];
    roles: Opcion[];
    estados: Opcion[];
}

const UsuariosUpdateForm = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | undefined>();
    const [formData, setFormData] = useState<UsuarioFormData>({
        primerApellido: '',
        segundoApellido: '',
        primerNombre: '',
        segundoNombre: '',
        idTipoDocumento: 0,
        numeroDocumento: '',
        direccion: '',
        telefono: '',
        idGrupoSanguineo: 0,
        rh: '',
        eps: '',
        arl: '',
        pension: '',
        licencia: '',
        idCategoriaLicencia: 0,
        organismo: '',
        vigencia: '',
        usuario: '',
        idRol: 0,
        idEstado: 0
    });

    const [opciones, setOpciones] = useState<Opciones>({
        tiposDocumento: [],
        gruposSanguineos: [],
        categoriasLicencia: [],
        roles: [],
        estados: []
    });

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        setUserId(id);

        const fetchOpciones = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/opciones`, {
                    credentials: 'include'
                });
                const data = await res.json();
                console.log('Opciones:', data);
                if (data.success) {
                    console.log('Opciones 1:', data.data);
                    setOpciones({
                        tiposDocumento: data.data.tiposDocumento || [],
                        gruposSanguineos: data.data.gruposSanguineos || [],
                        categoriasLicencia: data.data.categoriasLicencia || [],
                        roles: data.data.roles || [],
                        estados: data.data.estados || []
                    });
                }
            } catch (error) {
                console.error('Error al obtener opciones', error);
            }
        };

        fetchOpciones();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchUsuario = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/${userId}`, {
                        credentials: 'include'
                    });
                    const data = await res.json();
                    if (data.ok) {
                        const persona = data.usuario.Persona;
                        setFormData({
                            primerApellido: persona.primerApellido || '',
                            segundoApellido: persona.segundoApellido || '',
                            primerNombre: persona.primerNombre || '',
                            segundoNombre: persona.segundoNombre || '',
                            idTipoDocumento: persona.idTipoDocumento || 0,
                            numeroDocumento: persona.numeroDocumento || '',
                            direccion: persona.direccion || '',
                            telefono: persona.telefono || '',
                            idGrupoSanguineo: persona.idGrupoSanguineo || 0,
                            rh: persona.rh || '',
                            eps: persona.eps || '',
                            arl: persona.arl || '',
                            pension: persona.pension || '',
                            licencia: persona.licencia || '',
                            idCategoriaLicencia: persona.idCategoriaLicencia || 0,
                            organismo: persona.organismo || '',
                            vigencia: persona.vigencia?.split('T')[0] || '',
                            usuario: data.usuario.usuario || '',
                            idRol: data.usuario.idRol || 0,
                            idEstado: data.usuario.idEstado || 0
                        });
                    } else {
                        toast.error('Usuario no encontrado');
                    }
                } catch (error) {
                    console.error('Error al obtener usuario:', error);
                    toast.error('Error al obtener el usuario');
                }
            };

            fetchUsuario();
        }
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok && data.ok) {
                toast.success('Usuario actualizado correctamente');
                setTimeout(() => router.push('/usuarios'), 1500);
            } else {
                toast.error(data.msg || 'Error al actualizar usuario');
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            toast.error('Error del servidor al actualizar usuario');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl border border-yellow-100">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-gray-500 mb-6">Actualizar Usuario</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-12">
                        <div className="sm:col-span-6">
                            <label htmlFor="idRol" className="block text-sm/6 font-medium text-gray-900">
                                Rol
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="idRol"
                                    name="idRol"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.idRol}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un rol</option>
                                    {opciones.roles.map((rol: Opcion) => (
                                        <option key={rol.id} value={rol.id}>
                                        {rol.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="idEstado" className="block text-sm/6 font-medium text-gray-900">
                                Estado
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="idEstado"
                                    name="idEstado"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.idEstado}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un estado</option>
                                    {opciones.estados.map((estado: Opcion) => (
                                        <option key={estado.id} value={estado.id}>
                                        {estado.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="primerApellido" className="block text-sm/6 font-medium text-gray-900">
                                Primer Apellido
                            </label>
                            <div className="mt-2">
                                <input
                                    id="primerApellido"
                                    name="primerApellido"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.primerApellido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="segundoApellido" className="block text-sm/6 font-medium text-gray-900">
                                Segundo Apellido
                            </label>
                            <div className="mt-2">
                                <input
                                    id="segundoApellido"
                                    name="segundoApellido"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.segundoApellido}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="primerNombre" className="block text-sm/6 font-medium text-gray-900">
                                Primer Nombre
                            </label>
                            <div className="mt-2">
                                <input
                                    id="primerNombre"
                                    name="primerNombre"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.primerNombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="segundoNombre" className="block text-sm/6 font-medium text-gray-900">
                                Segundo Nombre
                            </label>
                            <div className="mt-2">
                                <input
                                    id="segundoNombre"
                                    name="segundoNombre"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.segundoNombre}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="idTipoDocumento" className="block text-sm/6 font-medium text-gray-900">
                                Tipo de Documento
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="idTipoDocumento"
                                    name="idTipoDocumento"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.idTipoDocumento}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un tipo de documento</option>
                                    {opciones.tiposDocumento.map((tipoDoc: Opcion) => (
                                        <option key={tipoDoc.id} value={tipoDoc.id}>
                                            {tipoDoc.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="numeroDocumento" className="block text-sm/6 font-medium text-gray-900">
                                Número de Documento
                            </label>
                            <div className="mt-2">
                                <input
                                    id="numeroDocumento"
                                    name="numeroDocumento"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.numeroDocumento}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="direccion" className="block text-sm/6 font-medium text-gray-900">
                                Dirección de Residencia
                            </label>
                            <div className="mt-2">
                                <input
                                    id="direccion"
                                    name="direccion"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="telefono" className="block text-sm/6 font-medium text-gray-900">
                                Teléfono
                            </label>
                            <div className="mt-2">
                                <input
                                    id="telefono"
                                    name="telefono"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="idGrupoSanguineo" className="block text-sm/6 font-medium text-gray-900">
                                Grupo Sanguíneo
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="idGrupoSanguineo"
                                    name="idGrupoSanguineo"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.idGrupoSanguineo}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un grupo sanguíneo</option>
                                    {opciones.gruposSanguineos.map((grupoSanguineo: Opcion) => (
                                        <option key={grupoSanguineo.id} value={grupoSanguineo.id}>
                                            {grupoSanguineo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="rh" className="block text-sm/6 font-medium text-gray-900">
                                RH
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="rh"
                                    name="rh"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.rh}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un RH</option>
                                    <option value="+">+ (Positivo)</option>
                                    <option value="-">- (Negativo)</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="eps" className="block text-sm/6 font-medium text-gray-900">
                                Nombre EPS Afiliación
                            </label>
                            <div className="mt-2">
                                <input
                                    id="eps"
                                    name="eps"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.eps}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="arl" className="block text-sm/6 font-medium text-gray-900">
                                Nombre ARL Afiliación
                            </label>
                            <div className="mt-2">
                                <input
                                    id="arl"
                                    name="arl"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.arl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="pension" className="block text-sm/6 font-medium text-gray-900">
                                Pensión
                            </label>
                            <div className="mt-2">
                                <input
                                    id="pension"
                                    name="pension"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.pension}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="idCategoriaLicencia" className="block text-sm/6 font-medium text-gray-900">
                                Categoría de Licencia
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="idCategoriaLicencia"
                                    name="idCategoriaLicencia"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.idCategoriaLicencia}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {opciones.categoriasLicencia.map((categoria: Opcion) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="licencia" className="block text-sm/6 font-medium text-gray-900">
                                Licencia
                            </label>
                            <div className="mt-2">
                                <input
                                    id="licencia"
                                    name="licencia"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.licencia}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="organismo" className="block text-sm/6 font-medium text-gray-900">
                                Organismo
                            </label>
                            <div className="mt-2">
                                <input
                                    id="organismo"
                                    name="organismo"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.organismo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        
                        <div className="sm:col-span-6">
                            <label htmlFor="vigencia" className="block text-sm/6 font-medium text-gray-900">
                                Vigencia
                            </label>
                            <div className="mt-2">
                                <input
                                    id="vigencia"
                                    name="vigencia"
                                    type="date"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                    value={formData.vigencia}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 cursor-pointer mt-6"
                    >
                        Actualizar Usuario
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsuariosUpdateForm;