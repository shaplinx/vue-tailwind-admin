/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
    export interface Pertemuan {
        id: number;
        pasien_id: number;
        poliklinik_id: number;
        pemeriksa_id: number;
        asisten_id: number | null;
        waktu_pertemuan: string;
        created_at: string | null;
        updated_at: string | null;
        pemeriksaan?: App.Models.Pertemuan.Pemeriksaan | null;
        resep?: App.Models.Fasilitas.Farmasi.Resep | null;
        permintaan_lab?: App.Models.Fasilitas.Lab.PermintaanLab | null;
        pertemuan_tindakan?: App.Models.Pertemuan.PertemuanTindakan | null;
        pemeriksa?: App.Models.User | null;
        asisten?: App.Models.User | null;
        poliklinik?: App.Models.Fasilitas.Poliklinik | null;
        pasien?: App.Models.Pasien | null;
        invoice?: App.Models.Invoice | null;
        surat_sakit?: App.Models.Pertemuan.SuratSakit | null;
        surat_sehat?: App.Models.Pertemuan.SuratSehat | null;
        readonly label?: any;
    }

    export interface Invoice {
        id: number;
        pertemuan_id: number;
        processed_at: string | null;
        completed_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        ref_number: string | null;
        invoice_contents?: Array<App.Models.InvoiceContent> | null;
        pertemuan?: App.Models.Pertemuan | null;
        invoice_contents_count?: number | null;
        readonly total?: any;
        readonly sub_total_pemeriksaan?: any;
        readonly sub_total_obat?: any;
        readonly sub_total_lab?: any;
        readonly sub_total_tindakan?: any;
        readonly waktu_pertemuan?: any;
        readonly ballance?: any;
    }

    export interface Pasien {
        id: number;
        no_id: string | null;
        nama_lengkap: string;
        kelamin: any;
        tmp_lahir_id: string;
        tgl_lahir: string;
        alamat: string;
        alamat_id: number | null;
        hp: string | null;
        goldar: string | null;
        pekerjaan: string | null;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
        tmp_lahir?: App.Models.Vendors.Indonesia.Kabupaten | null;
        alamat_idn?: App.Models.Vendors.Indonesia.Desa | null;
        readonly alamatLengkap: any;
    }

    export interface User {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        password: string;
        profesi_id: number;
        remember_token: string | null;
        created_at: string | null;
        updated_at: string | null;
        profesi?: App.Models.Administrasi.Profesi | null;
        readonly fullname?: any;
        readonly full_name?: any;
        readonly all_permissions?: any;
        readonly is_admin?: any;
    }

    export interface PersonalAccessToken {
        id: number;
        tokenable_type: string;
        tokenable_id: number;
        name: string;
        token: string;
        abilities: string | null;
        last_used_at: string | null;
        expired_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        tokenable?: any | null;
    }

    export interface InvoiceContent {
        id: number;
        content_type: string;
        content_id: number;
        deskripsi: string;
        user_id: number | null;
        invoice_id: number;
        harga: number;
        jumlah: number;
        created_at: string | null;
        updated_at: string | null;
        contents?: any | null;
    }

    export interface Diagnosis {
        id: number;
        nama: string;
        icd10_id: number | null;
        deleted_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        icd10?: App.Models.Administrasi.ICD10 | null;
    }

}

declare namespace App.Models.Vendors.Indonesia {
    export interface Kabupaten {
        id: number;
        code: string;
        province_code: string;
        name: string;
        meta: string | null;
        created_at: string | null;
        updated_at: string | null;
        provinsi?: App.Models.Vendors.Indonesia.Provinsi | null;
        province?: Laravolt.Indonesia.Models.Province | null;
        districts?: Array<Laravolt.Indonesia.Models.District> | null;
        villages?: Array<Laravolt.Indonesia.Models.Village> | null;
        districts_count?: number | null;
        villages_count?: number | null;
        readonly address?: any;
        readonly province_name?: any;
        readonly logo_path?: any;
    }

    export interface Desa {
        id: number;
        code: string;
        district_code: string;
        name: string;
        meta: string | null;
        created_at: string | null;
        updated_at: string | null;
        kecamatan?: App.Models.Vendors.Indonesia.Kecamatan | null;
        district?: Laravolt.Indonesia.Models.District | null;
        readonly alamat_lengkap?: any;
        readonly address?: any;
        readonly district_name?: any;
        readonly city_name?: any;
        readonly province_name?: any;
    }

    export interface Provinsi {
        id: number;
        code: string;
        name: string;
        meta: string | null;
        created_at: string | null;
        updated_at: string | null;
        cities?: Array<Laravolt.Indonesia.Models.City> | null;
        districts?: Array<Laravolt.Indonesia.Models.District> | null;
        cities_count?: number | null;
        districts_count?: number | null;
        readonly address?: any;
        readonly logo_path?: any;
    }

    export interface Kecamatan {
        id: number;
        code: string;
        city_code: string;
        name: string;
        meta: string | null;
        created_at: string | null;
        updated_at: string | null;
        kabupaten?: App.Models.Vendors.Indonesia.Kabupaten | null;
        city?: Laravolt.Indonesia.Models.City | null;
        villages?: Array<Laravolt.Indonesia.Models.Village> | null;
        villages_count?: number | null;
        readonly address?: any;
        readonly city_name?: any;
        readonly province_name?: any;
    }

}

declare namespace App.Models.Pertemuan {
    export interface Pemeriksaan {
        id: number;
        pertemuan_id: number;
        anamnesis: string;
        tekanan_darah: string | null;
        laju_nadi: number | null;
        laju_nafas: number | null;
        suhu: number | null;
        saturasi: number | null;
        px_fisik: string;
        created_at: string | null;
        updated_at: string | null;
        processed_at: string | null;
        completed_at: string | null;
        BB: number | null;
        TB: number | null;
        buta_warna: boolean | null;
        pertemuan?: App.Models.Pertemuan | null;
        diagnosis?: Array<App.Models.Diagnosis> | null;
        diagnosis_count?: number | null;
        readonly ballance?: any;
    }

    export interface PertemuanTindakan {
        id: number;
        pertemuan_id: number;
        processed_at: string | null;
        completed_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        pertemuan?: App.Models.Pertemuan | null;
        tindakan_contents?: Array<App.Models.Pertemuan.TindakanContent> | null;
        tindakan_contents_count?: number | null;
    }

    export interface ResepContent {
        id: number;
        resep_id: number;
        obat_id: number;
        jumlah: number;
        aturan_pakai: string;
        created_at: string | null;
        updated_at: string | null;
        resep?: App.Models.Fasilitas.Farmasi.Resep | null;
        obat?: App.Models.Fasilitas.Farmasi.Obat | null;
        ballance_mutations?: Array<App.Models.Administrasi.BallanceMutation> | null;
        ballance_mutations_count?: number | null;
    }

    export interface HasilLab {
        id: number;
        permintaan_lab_id: number;
        komponen_lab_id: number;
        pemeriksaan_lab_id: number;
        hasil: string | null;
        created_at: string | null;
        updated_at: string | null;
        permintaan_lab?: App.Models.Fasilitas.Lab.PermintaanLab | null;
        pemeriksaan_lab?: App.Models.Fasilitas.Lab.PemeriksaanLab | null;
        komponen_lab?: App.Models.Fasilitas.Lab.KomponenLab | null;
    }

    export interface ResepLuar {
        id: number;
        created_at: string | null;
        updated_at: string | null;
        nama_obat: string;
        jumlah: number;
        signa: string;
        resep_id: number;
        resep?: App.Models.Fasilitas.Farmasi.Resep | null;
    }

    export interface TindakanContent {
        id: number;
        tindakan_id: number;
        pertemuan_tindakan_id: number;
        operator_id: number;
        asisten_id: number | null;
        jumlah: number;
        created_at: string | null;
        updated_at: string | null;
        pertemuan_tindakan?: App.Models.Pertemuan.PertemuanTindakan | null;
        tindakan?: App.Models.Administrasi.Tindakan | null;
        operator?: App.Models.User | null;
        asisten?: App.Models.User | null;
    }

    export interface SuratSehat {
        id: number;
        pertemuan_id: number;
        ref_number: string;
        keperluan: string;
        created_at: string | null;
        updated_at: string | null;
        pertemuan?: App.Models.Pertemuan | null;
        readonly waktu_pertemuan?: any;
    }

    export interface SuratSakit {
        id: number;
        pertemuan_id: number;
        ref_number: string;
        dari: string;
        sampai: string;
        created_at: string | null;
        updated_at: string | null;
        pertemuan?: App.Models.Pertemuan | null;
        readonly waktu_pertemuan?: any;
    }

}

declare namespace App.Models.Administrasi {
    export interface Gaji {
        id: number;
        user_id: number | null;
        start_date: string;
        end_date: string;
        created_at: string | null;
        updated_at: string | null;
        processed_at: string | null;
        completed_at: string | null;
        jasa?: Array<App.Models.InvoiceContent> | null;
        custom_gaji_contents?: Array<App.Models.Administrasi.CustomGajiContent> | null;
        user?: App.Models.User | null;
        jasa_count?: number | null;
        custom_gaji_contents_count?: number | null;
        readonly total_jasa?: any;
        readonly total_custom_gaji?: any;
        readonly total_gaji?: any;
        readonly filtered_jasa?: any;
        readonly ballance?: any;
    }

    export interface Tindakan {
        id: number;
        nama: string;
        harga_jual: number;
        jasa: number;
        bagian_operator: number;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
        readonly bagian_asisten?: any;
        readonly ballance?: any;
    }

    export interface BallanceMutation {
        id: number;
        mutator_type: string | null;
        mutator_id: number | null;
        reference_type: string | null;
        reference_id: number | null;
        amount: number;
        description: string | null;
        active: boolean;
        created_at: string | null;
        updated_at: string | null;
        reference?: any | null;
        mutator?: any | null;
        readonly has_mutator?: any;
    }

    export interface ICD10 {
        id: number;
        code: string;
        name_en: string;
        name_locale: string;
    }

    export interface CustomGajiContent {
        id: number;
        gaji_id: number | null;
        harga: number;
        deskripsi: string;
        created_at: string | null;
        updated_at: string | null;
    }

    export interface Profesi {
        id: number;
        nama: string;
        gelar_depan: string | null;
        gelar_belakang: string | null;
        gaji_pokok: number;
        deleted_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        poliklinik?: Array<App.Models.Fasilitas.Poliklinik> | null;
        poliklinik_count?: number | null;
    }

}

declare namespace App.Models.Fasilitas.Farmasi {
    export interface Resep {
        id: number;
        pertemuan_id: number;
        farmasis_id: number | null;
        processed_at: string | null;
        completed_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        ref_number: string | null;
        pertemuan?: App.Models.Pertemuan | null;
        resep_contents?: Array<App.Models.Pertemuan.ResepContent> | null;
        farmasis?: App.Models.User | null;
        resep_luars?: Array<App.Models.Pertemuan.ResepLuar> | null;
        resep_contents_count?: number | null;
        resep_luars_count?: number | null;
        readonly waktu_pertemuan?: any;
    }

    export interface Obat {
        id: number;
        nama: string;
        pabrik: string;
        sediaan: string;
        kemasan: string;
        harga_jual: number;
        harga_beli: number;
        alert_stock: number;
        deleted_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        readonly label?: any;
        readonly stock?: any;
        readonly ballance?: any;
    }

}

declare namespace App.Models.Fasilitas {
    export interface Poliklinik {
        id: number;
        nama: string;
        kode: string;
        fee: number;
        jasa_klinisi: number;
        jasa_asisten: number;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
        profesi?: Array<App.Models.Administrasi.Profesi> | null;
        profesi_count?: number | null;
    }

}

declare namespace App.Models.Fasilitas.Lab {
    export interface PemeriksaanLab {
        id: number;
        nama: string;
        kode: string;
        harga_beli: number;
        harga_jual: number;
        kategori_lab_id: number;
        deleted_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        komponen_lab?: Array<App.Models.Fasilitas.Lab.KomponenLab> | null;
        kategori_lab?: App.Models.Fasilitas.Lab.KategoriLab | null;
        komponen_lab_count?: number | null;
        readonly ballance?: any;
    }

    export interface KategoriLab {
        id: number;
        nama: string;
        kode: string;
        deleted_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        pemeriksaan_lab?: Array<App.Models.Fasilitas.Lab.PemeriksaanLab> | null;
        pemeriksaan_lab_count?: number | null;
    }

    export interface KomponenLab {
        id: number;
        nama: string;
        kode: string;
        satuan: string;
        alert_stock: number;
        nilai_rujukan: string;
        deleted_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        pemeriksaan_lab?: Array<App.Models.Fasilitas.Lab.PemeriksaanLab> | null;
        pemeriksaan_lab_count?: number | null;
        readonly stock?: any;
        readonly ballance?: any;
    }

    export interface PermintaanLab {
        id: number;
        pertemuan_id: number;
        laborat_id: number | null;
        processed_at: string | null;
        completed_at: string | null;
        created_at: string | null;
        updated_at: string | null;
        ref_number: string | null;
        pertemuan?: App.Models.Pertemuan | null;
        laborat?: App.Models.User | null;
        hasil_labs?: Array<App.Models.Pertemuan.HasilLab> | null;
        pemeriksaan_labs?: Array<App.Models.Fasilitas.Lab.PemeriksaanLab> | null;
        hasil_labs_count?: number | null;
        pemeriksaan_labs_count?: number | null;
        readonly waktu_pertemuan?: any;
    }

}
