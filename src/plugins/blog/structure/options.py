# Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

from datetime import date, datetime, time, timezone
from mkdocs.config.base import BaseConfigOption, Config, ValidationError
from mkdocs.config.config_options import ListOfItems, T
from mkdocs.structure.files import Files
from mkdocs.structure.nav import (
    Navigation, _add_parent_links, _data_to_navigation
)
from typing import Dict

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Date dictionary
class DateDict(Dict[str, datetime]):

    # Initialize date dictionary
    def __init__(self, data: dict):
        super().__init__(data)

        # Ensure presence of `date.created`
        self.created: datetime = data["created"]

    # Allow attribute access
    def __getattr__(self, name: str):
        if name in self:
            return self[name]

# -----------------------------------------------------------------------------

# Post date option
class PostDate(BaseConfigOption[DateDict]):

    # Initialize post dates
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    # Normalize the supported types for post dates to datetime
    def pre_validation(self, config: Config, key_name: str):

        # If the date points to a scalar value, convert it to a dictionary, as
        # we want to allow the author to specify custom and arbitrary dates for
        # posts. Currently, only the `created` date is mandatory, because it's
        # needed to sort posts for views.
        if not isinstance(config[key_name], dict):
            config[key_name] = { "created": config[key_name] }

        # Convert all date values to datetime
        for key, value in config[key_name].items():

            # Handle datetime - since datetime is a subclass of date, we need
            # to check it first, or we lose the time - see https://t.ly/-KG9N
            if isinstance(value, datetime):
                # Set timezone to UTC if not set
                if value.tzinfo is None:
                    config[key_name][key] = value.replace(tzinfo=timezone.utc)
                continue;


            # Handle date - we set 00:00:00 as the default time, if the author
            # only supplied a date, and convert it to datetime in UTC
            if isinstance(value, date):
                config[key_name][key] = datetime.combine(value, time()).replace(tzinfo=timezone.utc)

        # Initialize date dictionary
        config[key_name] = DateDict(config[key_name])

    # Ensure each date value is of type datetime
    def run_validation(self, value: DateDict):
        for key in value:
            if not isinstance(value[key], datetime):
                raise ValidationError(
                    f"Expected type: {date} or {datetime} "
                    f"but received: {type(value[key])}"
                )

        # Ensure presence of `date.created`
        if not value.created:
            raise ValidationError(
                "Expected 'created' date when using dictionary syntax"
            )

        # Return date dictionary
        return value

# -----------------------------------------------------------------------------

# Post links option
class PostLinks(BaseConfigOption[Navigation]):

    # Create navigation from structured items - we don't need to provide a
    # configuration object to the function, because it will not be used
    def run_validation(self, value: object):
        items = _data_to_navigation(value, Files([]), None)
        _add_parent_links(items)

        # Return navigation
        return Navigation(items, [])

# -----------------------------------------------------------------------------

# Unique list of items
class UniqueListOfItems(ListOfItems[T]):

    # Ensure that each item is unique
    def run_validation(self, value: object):
        data = super().run_validation(value)
        return list(dict.fromkeys(data))
