from drf_auto_endpoint.adapters import AngularFormlyAdapter


class NgxFormlyAdapter(AngularFormlyAdapter):

    @classmethod
    def adapt_field(self, field):
        new_field = super(NgxFormlyAdapter, self).adapt_field(field)

        new_field['templateOptions']['readonly'] = new_field.pop('read_only')

        print(dir(new_field))
        return new_field

    def render(self, config):
        config = super(NgxFormlyAdapter, self).render(config)
        return config
