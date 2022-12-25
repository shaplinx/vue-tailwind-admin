export default {
  computed: {
    formSchema() {
      return [
        {
          $formkit: "hidden",
          name: "id",
        },
        {
          component: 'div',
          class: 'row',
          children: [
            {
              component: 'div',
              class: "col-md-6 col-sm-12",
              children: [
                {
                  $formkit: "vue-select",
                  disabled: true,
                  name: "pasien",
                  vuelabel:"nama_lengkap",
                  label: t("pasien.form.nama_lengkap"),
                }
              ]
            },
            {
              component: 'div',
              class: "col-md-6 col-sm-12",
              children: [
                {
                  $formkit: "vue-select",
                  disabled: true,
                  name: "poliklinik",
                  vuelabel:"nama",
                  label: t("poliklinik.form.nama"),
                }
              ]
            },
          ]
        },
        {
          component: 'div',
          class: 'row',
          children: [
            {
              component: 'div',
              class: "col-md-6 col-sm-12",
              children: [
                {
                  $formkit: "vue-select",
                  disabled: true,
                  name: "pemeriksa",
                  vuelabel:"fullname",
                  label: t("pertemuan.form.pemeriksa"),
                }
              ]
            },
            {
              component: 'div',
              class: "col-md-6 col-sm-12",
              children: [
                {
                  $formkit: "vue-datetime",
                  disabled: true,
                  name: "waktu_pertemuan",
                  label: t("pertemuan.form.waktu_pertemuan"),
                }
              ]
            },
          ]
        },

      ];
    },
  }
}
