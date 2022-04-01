from socket import fromshare
from django import forms

class SnapshotForm(forms.Form):
    def __init__(self, *args, **kwargs):
        options = kwargs.pop('snapshot')
        selected = kwargs.pop('selected')
        super().__init__(*args, **kwargs)
        if options:
            self.fields['snapshot'] = forms.CharField(widget=forms.Select(choices=options, attrs={'onchange': "this.form.submit()"}))
            if selected:
                self.initial['snapshot'] = selected