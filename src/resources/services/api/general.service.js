import { apiInstance } from "../index";

export const generalApi = apiInstance.injectEndpoints({
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (data) => {
				return {
					url: `form-type?nationalCode=${data.natiohnalCode}`,
					method: "GET",
				};
			},
		}),

		getProvince: builder.query({
			query: () => {
				return {
					url: "api/Papilloguard/provinces",
				};
			},
		}),
		getCities: builder.query({
			query: (data) => {
				return {
					url: `api/Papilloguard/Cities/${data}`,
				};
			},
		}),
		getPhycian: builder.query({
			query: (dat) => {
				return {
					url: `api/Papilloguard/Physicians`,
				};
			},
		}),
		createPatient: builder.mutation({
			query: (data) => {
				return {
					url: `api/Papilloguard/CreatePatient`,
					method: "POST",
					data,
				};
			},
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLazyGetProvinceQuery,
	useLazyGetCitiesQuery,
	useLazyGetPhycianQuery,
	useCreatePatientMutation,
} = generalApi;
