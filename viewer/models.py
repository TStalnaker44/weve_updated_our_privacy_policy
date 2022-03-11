# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Sites(models.Model):
    id = models.IntegerField(primary_key=True)
    domain = models.TextField(blank=True, null=True)
    categories = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sites'
    
    def __str__(self):
        return str(self.domain)

class AlexaRanks(models.Model):
    site = models.OneToOneField(Sites, on_delete=models.PROTECT, primary_key=True) #site_id
    year = models.TextField(blank=True, null=True)
    phase = models.TextField(blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'alexa_ranks'

    def __str__(self):
        return str(self.site) + ' ' + str(self.year) + ' phase ' + str(self.phase) + ': ' + str(self.rank)


class PolicyHtmls(models.Model):
    id = models.IntegerField(primary_key=True)
    policy_html = models.TextField(blank=True, null=True)
    policy_html_sha1 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'policy_htmls'

    def __str__(self):
        return str(self.policy_html)[:50] + '...'


class PolicyReaderViewHtmls(models.Model):
    id = models.IntegerField(primary_key=True)
    policy_reader_view_html = models.TextField(blank=True, null=True)
    policy_reader_view_html_sha1 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'policy_reader_view_htmls'

    def __str__(self):
        return str(self.policy_reader_view_html)[:50] + '...'

class PolicyTexts(models.Model):
    id = models.IntegerField(primary_key = True)
    policy_text = models.TextField(blank=True, null=True)
    flesch_kincaid = models.FloatField(blank=True, null=True)
    smog = models.FloatField(blank=True, null=True)
    flesch_ease = models.TextField(blank=True, null=True)
    length = models.IntegerField(blank=True, null=True)
    sha1 = models.TextField(blank=True, null=True)
    simhash = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'policy_texts'

    def __str__(self):
        return str(self.policy_text)[:50] + '...'

class PolicySnapshots(models.Model):
    id = models.IntegerField(primary_key=True)
    site = models.ForeignKey(Sites, on_delete=models.PROTECT) #site_id
    homepage_snapshot_url = models.TextField(blank=True, null=True)
    policy_snapshot_url = models.TextField(blank=True, null=True)
    policy_url = models.TextField(blank=True, null=True)
    homepage_snapshot_redirected_url = models.TextField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    phase = models.TextField(blank=True, null=True)
    policy_text = models.ForeignKey(PolicyTexts, on_delete=models.PROTECT) #policy_text_id
    policy_html = models.ForeignKey(PolicyHtmls, on_delete=models.PROTECT) #policy_html_id
    policy_reader_view_html = models.ForeignKey(PolicyReaderViewHtmls, on_delete=models.PROTECT) #policy_reader_view_html_id
    file_type = models.TextField(blank=True, null=True)
    policy_title = models.TextField(blank=True, null=True)
    link_text = models.TextField(blank=True, null=True)
    pdf_filename = models.TextField(blank=True, null=True)
    classifier_probability = models.FloatField(blank=True, null=True)
    analysis_subcorpus = models.IntegerField(blank=True, null=True)
    parked_domain = models.IntegerField(blank=True, null=True)
    cross_domain_homepage_redir = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'policy_snapshots'

    def __str__(self):
        return str(self.id) + ' ' + str(self.site)
