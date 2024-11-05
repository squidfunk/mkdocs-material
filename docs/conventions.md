# Conventions

This section explains several conventions used in this documentation.

## Symbols

This documentation use some symbols for illustration purposes. Before you read
on, please make sure you've made yourself familiar with the following list of
conventions:

### <!-- md:sponsors --> – Sponsors only { data-toc-label="Sponsors only" }

The pumping heart symbol denotes that a specific feature or behavior is only
available to sponsors via [Insiders]. Make sure that you have access to
[Insiders] if you want to use the feature.

### <!-- md:version --> – Version { data-toc-label="Version" }

The tag symbol in conjunction with a version number denotes when a specific
feature or behavior was added. Make sure you're at least on this version
if you want to use it.

### <!-- md:version insiders- --> – Version (Insiders)  { data-toc-label="Version (Insiders)" }

The tag symbol with a heart in conjunction with a version number denotes that a
specific feature or behavior was added to the [Insiders] version of Material for
MkDocs.

### <!-- md:default --> – Default value { #default data-toc-label="Default value" }

Some properties in `mkdocs.yml` have default values for when the author does not
explicitly define them. The default value of the property is always included.

#### <!-- md:default computed --> – Default value is computed { #default data-toc-label="is computed" }

Some default values are not set to static values but computed from other values,
like the site language, repository provider, or other settings.

#### <!-- md:default none --> – Default value is empty { #default data-toc-label="is empty" }

Some properties do not contain default values. This means that the functionality
that is associated with them is not available unless explicitly enabled.

### <!-- md:flag metadata --> – Metadata property { #metadata data-toc-label="Metadata property" }

This symbol denotes that the thing described is a metadata property, which can
be used in Markdown documents as part of the front matter definition.

### <!-- md:flag multiple --> – Multiple instances { #multiple-instances data-toc-label="Multiple instances" }

This symbol denotes that the plugin supports multiple instances, i.e, that it
can be used multiple times in the `plugins` setting in `mkdocs.yml`.

### <!-- md:feature --> – Optional feature { #feature data-toc-label="Optional feature" }

Most of the features are hidden behind feature flags, which means they must
be explicitly enabled via `mkdocs.yml`. This allows for the existence of
potentially orthogonal features.

### <!-- md:flag experimental --> – Experimental { data-toc-label="Experimental" }

Some newer features are still considered experimental, which means they might
(although rarely) change at any time, including their complete removal (which
hasn't happened yet).

### <!-- md:plugin --> – Plugin { data-toc-label="Plugin" }

Several features are implemented through MkDocs excellent plugin architecture,
some of which are built-in and distributed with Material for MkDocs, so no
installation is required.

### <!-- md:extension --> – Markdown extension { data-toc-label="Markdown extension" #extension }

This symbol denotes that the thing described is a Markdown extension, which can
be enabled in `mkdocs.yml` and adds additional functionality to the Markdown
parser.

### <!-- md:flag required --> – Required value { #required data-toc-label="Required value" }

Some (very few in fact) properties or settings are required, which means the
authors must explicitly define them.

### <!-- md:flag customization --> – Customization { #customization data-toc-label="Customization" }

This symbol denotes that the thing described is a customization that must be
added by the author.

### <!-- md:utility --> – Utility { data-toc-label="Utility" }

Besides plugins, there are some utilities that build on top of MkDocs in order
to provide extended functionality, like for example support for versioning.

  [Insiders]: insiders/index.md
