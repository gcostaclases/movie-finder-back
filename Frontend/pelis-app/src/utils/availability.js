export function getUpdatedAvailability(prevAvailability, providerId, providers) {
	// Busco el proveedor seleccionado
	const proveedorSeleccionado = providers.find((p) => p._id === providerId);
	if (!proveedorSeleccionado) return prevAvailability;

	// Verifico si ya existe en availability
	const exists = prevAvailability.some((prov) => prov.providerId === providerId);

	let updatedAvailability;
	if (exists) {
		// Sumo 1 al reportCount si ya existe
		updatedAvailability = prevAvailability.map((prov) =>
			prov.providerId === providerId ? { ...prov, reportCount: (prov.reportCount || 0) + 1 } : prov
		);
	} else {
		// Lo agrego si no existe
		updatedAvailability = [
			...prevAvailability,
			{
				providerId: proveedorSeleccionado._id,
				providerLogo: proveedorSeleccionado.logo,
				providerName: proveedorSeleccionado.name,
				reportCount: 1,
			},
		];
	}

	// Calculo el total de reportes
	const totalReports = updatedAvailability.reduce((acc, prov) => acc + (prov.reportCount || 0), 0);

	// Recalculo los porcentajes
	return updatedAvailability.map((prov) => ({
		...prov,
		percentage: totalReports > 0 ? Math.round((prov.reportCount / totalReports) * 100) : 0,
	}));
}
