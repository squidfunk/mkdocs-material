# Access management

The Material for MkDocs Insiders repository is a private repository hosted on
GitHub and access is, therefore, managed through GitHub. This section covers
everything you need to know in order to gain access to the private Material for
MkDocs Insiders repository.

## How to get access

As the private Material for MkDocs Insiders repository is hosted on GitHub, you
require a GitHub account to become a sponsor and to gain access. After
sponsoring us on one of our [sponsoring tiers] starting at [$15 a month],
you'll get access to the private Insiders repository.

Please note that the process of gaining access is only partially automatable due
to technical reasons. Depending on the type of account you've used to become a
sponsor, we might need more information from you before we can grant access.

  [$15 a month]: https://github.com/sponsors/squidfunk/sponsorships?tier_id=210638
  [sponsoring tiers]: sponsoring-tiers.md

### Individuals

If you sponsor using a [personal account], you will receive an invitation link
via email to the private Material for MkDocs Insiders repository immediately
after initiating your sponsorship. This link is [valid for seven days]. Once you
accept the invitation, you'll be ready to [get started].

If the link expired, please contact us at sponsors@squidfunk.com and we'll
send you a new one.

  [personal account]: https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#personal-accounts
  [valid for seven days]: #expired-invitations
  [get started]: getting-started.md

### Organizations

When sponsoring using an [organization account], GitHub will not send an
automated invitation via email to access the private Material for MkDocs Insiders
repository. Due to [GitHub limitations], granting access to a private repository
for an entire organization is not possible.

Therefore, please contact us at sponsors@squidfunk.com with the names of the
[personal accounts] or the name of a [bot account] that is publicly or privately
listed as an owner of your GitHub organization after you received a confirmation
that your sponsorship was initiated.

We will add these designated accounts as collaborators, and once the invitations
are [accepted within seven days], your organization will be all set to [get
started].

  [organization account]: https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#organization-accounts
  [GitHub limitations]: #collaborators
  [bot account]: #bot-account
  [accepted within seven days]: #expired-invitations

### Enterprises

If you would like to sponsor us using an [enterprise account], we recommend
using a [personal account] or a [bot account] to initiate the sponsorship and
access the private Material for MkDocs Insiders repository using this account.

  [enterprise account]: https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#enterprise-accounts

## Restrictions

GitHub sets limitations beyond our control, which is why we require further
information regarding [collaborators] of private repositories and [matching] of
GitHub accounts.

  [collaborators]: #collaborators
  [matching]: #matching

### Collaborators

GitHub policy limits access to [private repositories] to [personal accounts]
only, which is why it is currently not possible for us to add [organization
accounts] to the Material for MkDocs Insiders repository – a private
repository.

As much as we would love to give each member of your organization access, it's
simply not feasible for us to add each member account, which is why each
[sponsoring tier] has a limited number of seats. However, you can use a [bot account] to work around this limitation.

  [private repositories]: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository
  [personal accounts]: https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#personal-accounts
  [organization accounts]: https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#organization-accounts
  [sponsoring tier]: sponsoring-tiers.md
  [team management]: #team-management

### Matching

Due to privacy reasons, GitHub does not allow email addresses to be matched with
GitHub accounts. When requesting access via email at sponsors@squidfunk.com,
it's necessary to provide us with the name of a [personal account].

## Bot account

Given that only personal accounts can be listed as collaborators on
[private repositories], ensuring access for an entire organization requires
coordination through individuals. Changes within the team could lead to losing
access to the entire organization. To avoid this, you have two options:

  - Choose a sponsoring tier with multiple seats to add additional accounts as
  collaborators
  - Create a bot account, which is [a new personal account] that does not belong
  to a specific individual but is publicly or privately listed as the owner of
  the GitHub organization

Using a bot account for access management and initiating your [public] or
[private] sponsorship through it also allows for better attribution of
sponsorship costs, allowing you to manage access and payment for all
sponsorships through a single account, and is thus recommended.

  [a new personal account]: https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github
  [public]: privacy.md/#public-sponsors
  [private]: privacy.md/#private-sponsors

## Expired invitations

The invitation to the private Material for MkDocs is valid for seven days, a
limitation imposed by GitHub. If invitations are not accepted within this
period, you'll need to contact us via mail at sponsors@squidfunk.com, and we
will re-issue the invitation immediately.

## Team management

If you are using Material for MkDocs Insiders as an [individual] and don't
collaborate with other users, [forking] the private repository is not necessary.
However, when working with a team, it is not possible to simply share your
collaborator status with other accounts. Therefore, in order to work in a team,
the account with access to Insiders can [fork], [clone], or [mirror] the private
Material for MkDocs Insiders repository to an organization, providing a pathway
for team collaboration.

  [fork]: #forking
  [clone]: #cloning
  [mirror]: #mirroring
  [individual]: #individuals

### Outside collaborators

When working with outside collaborators, you should know that the Insiders
edition is compatible with the community edition. All new features and
configuration options are backward-compatible or implemented behind feature
flags. Most Insiders features enhance the overall experience, e.g., by creating
better social cards or instant previews. While these features add value for your
site's users, they are most certainly not necessary for previewing your site.

This means that outside collaborators can build the documentation locally with
the community edition, and when they push their changes, your CI pipeline will
build it with Insiders. When using [built-in plugins] exclusive to Insiders, we
recommend using the [group] plugin.

See the [getting started guide] for more information.
  [getting started guide]: getting-started.md
  [built-in plugins]: index.md#built-in-plugins
  [group]: ../plugins/group.md

### Forking

[Forking] a repository creates a copy of the repository that allows for
independent development while maintaining a link to the original repository
for updates.

  [forking]: https://docs.github.com/en/get-started/quickstart/fork-a-repo

### Cloning

[Cloning] a repository copies the repository to your local machine or codespace,
facilitating offline work and content management. You can, of course, also
[clone a private fork].

  [cloning]: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
  [clone a private fork]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository

### Mirroring

[Mirroring] a repository creates an identical copy, ensuring you have the
flexibility to host and work with the repository [in other environments] besides
GitHub. This is a particularly useful strategy for organizations hosting their
repositories in a private environment outside of GitHub.

  [mirroring]: https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository
  [in other environments]: #github-alternatives

## GitHub alternatives

Material for MkDocs Insiders is designed to be compatible with various
repository hosting platforms, including GitLab. The key requirement is still a
GitHub account, as we use GitHub Sponsors for transactions and GitHub to manage access to the private Insiders repository.

Once you've become a sponsor and secured access to the private Insiders
repository via an individual GitHub account, you can [mirror the repository in
another location]. This mirroring process not only allows for easy integration
into your existing workflow but also ensures that your projects stay up-to-date
with the latest features and improvements of Insiders.

Our discussion board is a valuable resource for any questions about integrating
Material for MkDocs Insiders into your projects. It offers a space to connect
with others who may have similar requirements and setups, as well as to
exchange tips and explore solutions together.

  [mirror the repository in another location]: https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository#mirroring-a-repository-in-another-location
  [discussion board]: https://github.com/squidfunk/mkdocs-material/discussions
